import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

type PageData = {
	id: string
	alias: string
	title: string
	tags: string[]
	description: string
	category: string
	hh_count: number | null
	hh_junior_salary: number | null
	hh_middle_salary: number | null
	hh_senior_salary: number | null
}

type AdvantageData = {
	id: string
	title: string
	description: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const pageId = req.query.id as string

			// Get page with advantages
			const { data: page, error: pageError } = await supabase
				.from('pages')
				.select('*')
				.eq('id', pageId)
				.single()

			if (pageError) throw pageError

			// Get advantages for this page
			const { data: advantages, error: advError } = await supabase
				.from('advantages')
				.select('*')
				.eq('page_id', pageId)

			if (advError) throw advError

			const typedPage = page as PageData
			const typedAdvantages = advantages as AdvantageData[]

			// Format response to match old structure
			const response = {
				_id: typedPage.id,
				alias: typedPage.alias,
				title: typedPage.title,
				tags: typedPage.tags || [],
				description: typedPage.description,
				category: typedPage.category,
				hh: typedPage.hh_count
					? {
							count: typedPage.hh_count,
							juniorSalary: typedPage.hh_junior_salary,
							middleSalary: typedPage.hh_middle_salary,
							seniorSalary: typedPage.hh_senior_salary,
						}
					: undefined,
				advantages: typedAdvantages.map(adv => ({
					id: adv.id,
					title: adv.title,
					description: adv.description,
				})),
			}

			return res.status(200).json(response)
		} catch (error) {
			console.error('Page-find by ID error:', error)
			const message = error instanceof Error ? error.message : 'Unknown error'
			return res.status(400).json({ error: message })
		}
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
