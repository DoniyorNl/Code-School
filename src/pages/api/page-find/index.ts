import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

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

			// Get pages for each second category
			const result = await Promise.all(
				secondCategories.map(async secondCat => {
					const { data: pages, error: pagesError } = await supabase
						.from('pages')
						.select('id, alias, title, category')
						.eq('second_category_id', secondCat.id)

					if (pagesError) throw pagesError

					return {
						_id: {
							secondCategory: secondCat.name,
						},
						pages: pages.map(p => ({
							alias: p.alias,
							title: p.title,
							_id: p.id,
							category: p.category,
						})),
					}
				}),
			)

			return res.status(200).json(result)
		} catch (error: any) {
			console.error('Page-find error:', error)
			return res.status(400).json({ error: error.message })
		}
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
