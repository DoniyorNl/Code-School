import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

type SecondCategory = {
	id: number
	name: string
}

type PageData = {
	id: string
	alias: string
	title: string
	category: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { firstCategory } = req.body

			// Get second categories with their pages
			const { data: secondCategories, error } = await supabase
				.from('second_categories')
				.select('id, name')
				.eq('category_id', firstCategory)

			if (error) throw error

			const typedCategories = secondCategories as SecondCategory[]

			// Get pages for each second category
			const result = await Promise.all(
				typedCategories.map(async secondCat => {
					const { data: pages, error: pagesError } = await supabase
						.from('pages')
						.select('id, alias, title, category')
						.eq('second_category_id', secondCat.id)

					if (pagesError) throw pagesError

					const typedPages = pages as PageData[]

					return {
						_id: {
							secondCategory: secondCat.name,
						},
						pages: typedPages.map(p => ({
							alias: p.alias,
							title: p.title,
							_id: p.id,
							category: p.category,
						})),
					}
				}),
			)

			return res.status(200).json(result)
		} catch (error) {
			console.error('Page-find error:', error)
			const message = error instanceof Error ? error.message : 'Unknown error'
			return res.status(400).json({ error: message })
		}
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
