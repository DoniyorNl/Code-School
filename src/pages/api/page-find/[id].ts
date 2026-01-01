import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

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

			// Format response to match old structure
			const response = {
				_id: page.id,
				alias: page.alias,
				title: page.title,
				tags: page.tags || [],
				description: page.description,
				category: page.category,
				hh: page.hh_count
					? {
							count: page.hh_count,
							juniorSalary: page.hh_junior_salary,
							middleSalary: page.hh_middle_salary,
							seniorSalary: page.hh_senior_salary,
					  }
					: undefined,
				advantages: advantages.map(adv => ({
					id: adv.id,
					title: adv.title,
					description: adv.description,
				})),
			}

			return res.status(200).json(response)
		} catch (error: any) {
			console.error('Page-find by ID error:', error)
			return res.status(400).json({ error: error.message })
		}
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
