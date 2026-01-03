import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { ScrollUp } from '../components'
import Card from '../components/card/card'
import Heading from '../components/heading/heading'
import Icon from '../components/icon/DynamicIcon'
import Footer from '../layout/footer/footer'
import Header from '../layout/header/header'
import Seo from '../layout/seo/seo'
import styles from '../styles/contact.module.css'

const ContactPage = (): JSX.Element => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})

	const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
		'idle',
	)

	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors({
				...errors,
				[name]: '',
			})
		}
	}

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {}

		if (formData.name.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters'
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
		}

		if (formData.subject.trim().length < 3) {
			newErrors.subject = 'Subject must be at least 3 characters'
		}

		if (formData.message.trim().length < 10) {
			newErrors.message = 'Message must be at least 10 characters'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setSubmitStatus('submitting')

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setSubmitStatus('success')
				setFormData({ name: '', email: '', subject: '', message: '' })
				setTimeout(() => setSubmitStatus('idle'), 5000)
			} else {
				setSubmitStatus('error')
				setTimeout(() => setSubmitStatus('idle'), 5000)
			}
		} catch (error) {
			console.error('Form submission error:', error)
			setSubmitStatus('error')
			setTimeout(() => setSubmitStatus('idle'), 5000)
		}
	}

	return (
		<>
			<Header />
			<Seo
				metaTitle='Contact Us - Get in Touch'
				metaDescription='Have questions? Contact our team for support, partnerships, or general inquiries. We are here to help you succeed in your learning journey.'
				metaKeyword='contact us, support, help, customer service, email, phone'
			>
				<div className={styles.container}>
					<div className={styles.hero}>
						<Heading tag='h1' className={styles.title}>
							Get in Touch
						</Heading>
						<p className={styles.subtitle}>
							Have questions or need assistance? We'd love to hear from you. Send us a message and
							we'll respond as soon as possible.
						</p>
					</div>

					<div className={styles.content}>
						<div className={styles.contactInfo}>
							<Card className={styles.infoCard}>
								<div className={styles.infoItem}>
									<div className={styles.iconWrapper}>
										<Icon name='FaEnvelope' style={{ fontSize: '24px', color: '#7653FC' }} />
									</div>
									<div className={styles.infoText}>
										<h3>Email Us</h3>
										<a href='mailto:info@codeschool.com'>info@codeschool.com</a>
										<a href='mailto:support@codeschool.com'>support@codeschool.com</a>
									</div>
								</div>
							</Card>

							<Card className={styles.infoCard}>
								<div className={styles.infoItem}>
									<div className={styles.iconWrapper}>
										<Icon name='FaPhone' style={{ fontSize: '24px', color: '#7653FC' }} />
									</div>
									<div className={styles.infoText}>
										<h3>Call Us</h3>
										<a href='tel:+998901234567'>+998 (90) 123-45-67</a>
										<p>Mon-Fri: 9:00 AM - 6:00 PM</p>
									</div>
								</div>
							</Card>

							<Card className={styles.infoCard}>
								<div className={styles.infoItem}>
									<div className={styles.iconWrapper}>
										<Icon name='FaMapMarkerAlt' style={{ fontSize: '24px', color: '#7653FC' }} />
									</div>
									<div className={styles.infoText}>
										<h3>Visit Us</h3>
										<p>Tashkent, Uzbekistan</p>
										<p>Chilonzor District</p>
									</div>
								</div>
							</Card>

							<Card className={styles.infoCard}>
								<div className={styles.infoItem}>
									<div className={styles.iconWrapper}>
										<Icon name='FaGlobe' style={{ fontSize: '24px', color: '#7653FC' }} />
									</div>
									<div className={styles.infoText}>
										<h3>Follow Us</h3>
										<p className={styles.socialDescription}>Connect with us on social media</p>
										<div className={styles.socialLinks}>
											<a
												href='https://t.me/codeschool'
												target='_blank'
												rel='noopener noreferrer'
												title='Telegram'
												aria-label='Follow us on Telegram'
											>
												<Icon
													className={`${styles.socialLink} ${styles.telegram}`}
													name='FaTelegram'
													style={{ fontSize: '24px' }}
												/>
											</a>
											<a
												href='https://instagram.com/codeschool'
												target='_blank'
												rel='noopener noreferrer'
												title='Instagram'
												aria-label='Follow us on Instagram'
											>
												<Icon
													className={`${styles.socialLink} ${styles.instagram}`}
													name='FaInstagram'
													style={{ fontSize: '24px' }}
												/>
											</a>
											<a
												href='https://facebook.com/codeschool'
												target='_blank'
												rel='noopener noreferrer'
												title='Facebook'
												aria-label='Follow us on Facebook'
											>
												<Icon
													className={`${styles.socialLink} ${styles.facebook}`}
													name='FaFacebook'
													style={{ fontSize: '24px' }}
												/>
											</a>
											<a
												href='https://youtube.com/@codeschool'
												target='_blank'
												rel='noopener noreferrer'
												title='YouTube'
												aria-label='Subscribe to our YouTube channel'
											>
												<Icon
													className={`${styles.socialLink} ${styles.youtube}`}
													name='FaYoutube'
													style={{ fontSize: '24px' }}
												/>
											</a>
										</div>
									</div>
								</div>
							</Card>
						</div>

						<Card className={styles.formCard}>
							<Heading tag='h2' className={styles.formTitle}>
								Send us a Message
							</Heading>
							<form onSubmit={handleSubmit} className={styles.form}>
								<div className={styles.formGroup}>
									<label htmlFor='name'>Full Name *</label>
									<input
										type='text'
										id='name'
										name='name'
										value={formData.name}
										onChange={handleChange}
										placeholder='John Doe'
										className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
									/>
									{errors.name && <span className={styles.errorText}>{errors.name}</span>}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor='email'>Email Address *</label>
									<input
										type='email'
										id='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										placeholder='john.doe@example.com'
										className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
									/>
									{errors.email && <span className={styles.errorText}>{errors.email}</span>}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor='subject'>Subject *</label>
									<input
										type='text'
										id='subject'
										name='subject'
										value={formData.subject}
										onChange={handleChange}
										placeholder='e.g., Question about courses'
										className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
									/>
									{errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor='message'>Message *</label>
									<textarea
										id='message'
										name='message'
										value={formData.message}
										onChange={handleChange}
										placeholder='Please provide details about your inquiry. The more information you share, the better we can assist you.'
										rows={7}
										className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
									/>
									{errors.message && <span className={styles.errorText}>{errors.message}</span>}
								</div>

								{submitStatus === 'success' && (
									<div className={styles.successMessage}>
										<Icon name='FaCheckCircle' style={{ fontSize: '20px' }} />
										<div>
											<strong>Message sent successfully!</strong>
											<p>We've received your message and will respond within 24 hours.</p>
										</div>
									</div>
								)}

								{submitStatus === 'error' && (
									<div className={styles.errorMessage}>
										<Icon name='BiErrorCircle' style={{ fontSize: '20px' }} />
										<div>
											<strong>Oops! Something went wrong.</strong>
											<p>Please try again or contact us directly via email.</p>
										</div>
									</div>
								)}

								<button
									type='submit'
									className={styles.submitButton}
									disabled={submitStatus === 'submitting'}
								>
									{submitStatus === 'submitting' ? (
										<>
											<span className={styles.spinner}></span>
											Sending...
										</>
									) : (
										<>
											Send Message
											<Icon name='FaPaperPlane' style={{ fontSize: '16px', marginLeft: '8px' }} />
										</>
									)}
								</button>
							</form>
						</Card>
					</div>
				</div>
			</Seo>
			<Footer />
			<ScrollUp />
		</>
	)
}

export default ContactPage

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	}
}
