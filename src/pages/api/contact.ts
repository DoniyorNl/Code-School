import { NextApiRequest, NextApiResponse } from 'next'

interface ContactFormData {
	name: string
	email: string
	subject: string
	message: string
}

interface ContactResponse {
	success: boolean
	message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ContactResponse>) {
	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Method not allowed' })
	}

	try {
		const { name, email, subject, message } = req.body as ContactFormData

		// Validate input
		if (!name || !email || !subject || !message) {
			return res.status(400).json({ success: false, message: 'Missing required fields' })
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: 'Invalid email format' })
		}

		// TODO: Integrate with email service (SendGrid, Nodemailer, EmailJS, etc.)
		// For now, return success. Remove verbose console logs in production.

		// In production, you would:
		// 1. Send email using SendGrid/Nodemailer
		// 2. Store in database
		// 3. Send confirmation email to user

		return res.status(200).json({
			success: true,
			message: 'Message received. We will respond within 24 hours.',
		})
	} catch (error) {
		console.error('Contact form error:', error)
		return res
			.status(500)
			.json({ success: false, message: 'Server error. Please try again later.' })
	}
}
