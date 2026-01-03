import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { supabase } = await import('../../lib/supabase')

		// Simple query to check connectivity and minimal permissions
		const { data, error } = await supabase.from('second_categories').select('id').limit(1)

		if (error) {
			console.error('Supabase test query error:', error)
			return res.status(500).json({ ok: false, error: error.message || 'Supabase error' })
		}

		return res.status(200).json({ ok: true, sample: data })
	} catch (err) {
		console.error('Test-connection error:', err)
		const message = err instanceof Error ? err.message : 'Unknown error'
		return res.status(500).json({ ok: false, error: message })
	}
}
