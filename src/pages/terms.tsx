import { GetServerSideProps } from 'next'
import { ScrollUp } from '../components'
import Heading from '../components/heading/heading'
import Footer from '../layout/footer/footer'
import Header from '../layout/header/header'
import Seo from '../layout/seo/seo'
import styles from '../styles/legal.module.css'

const TermsPage = (): JSX.Element => {
	return (
		<>
			<Header />
			<Seo
				metaTitle='Terms of Use - CodeSchool'
				metaDescription='Read our terms of use and understand the rules and regulations for using CodeSchool platform and services.'
				metaKeyword='terms of use, terms and conditions, user agreement, legal terms'
			>
				<div className={styles.container}>
					<div className={styles.hero}>
						<Heading tag='h1' className={styles.title}>
							Terms of Use
						</Heading>
						<p className={styles.lastUpdated}>Last Updated: January 1, 2026</p>
					</div>

					<div className={styles.content}>
						<section className={styles.section}>
							<h2>1. Acceptance of Terms</h2>
							<p>
								By accessing and using CodeSchool ("the Platform"), you accept and agree to be bound
								by the terms and provision of this agreement. If you do not agree to abide by the
								above, please do not use this service.
							</p>
						</section>

						<section className={styles.section}>
							<h2>2. Use License</h2>
							<p>
								Permission is granted to temporarily access the materials (information or software)
								on CodeSchool's platform for personal, non-commercial transitory viewing only. This
								is the grant of a license, not a transfer of title, and under this license you may
								not:
							</p>
							<ul>
								<li>Modify or copy the materials</li>
								<li>Use the materials for any commercial purpose or for any public display</li>
								<li>Attempt to reverse engineer any software contained on CodeSchool's platform</li>
								<li>Remove any copyright or other proprietary notations from the materials</li>
								<li>
									Transfer the materials to another person or "mirror" the materials on any other
									server
								</li>
							</ul>
						</section>

						<section className={styles.section}>
							<h2>3. User Account</h2>
							<p>
								To access certain features of the Platform, you may be required to create an
								account. You are responsible for:
							</p>
							<ul>
								<li>Maintaining the confidentiality of your account and password</li>
								<li>Restricting access to your computer and account</li>
								<li>All activities that occur under your account or password</li>
								<li>Providing accurate and complete registration information</li>
							</ul>
							<p>
								You must notify us immediately of any unauthorized use of your account or any other
								breach of security.
							</p>
						</section>

						<section className={styles.section}>
							<h2>4. Course Access and Content</h2>
							<p>
								When you enroll in a course, you are granted a limited, non-exclusive,
								non-transferable license to access and view the course content. You may not:
							</p>
							<ul>
								<li>Share your account credentials with others</li>
								<li>Download, copy, or distribute course materials without permission</li>
								<li>Use course content for commercial purposes</li>
								<li>Record, screenshot, or reproduce course videos or materials</li>
							</ul>
						</section>

						<section className={styles.section}>
							<h2>5. Payment and Refunds</h2>
							<p>
								All course fees are listed in USD and are subject to change. Payment must be made in
								full before accessing course materials. Refund policy:
							</p>
							<ul>
								<li>
									Full refund within 7 days of purchase if less than 20% of course is completed
								</li>
								<li>No refunds after 30 days from purchase date</li>
								<li>Promotional and discounted courses may have different refund policies</li>
							</ul>
						</section>

						<section className={styles.section}>
							<h2>6. Intellectual Property</h2>
							<p>
								All content on CodeSchool, including but not limited to text, graphics, logos,
								icons, images, audio clips, video clips, and software, is the property of CodeSchool
								or its content suppliers and is protected by international copyright laws.
							</p>
						</section>

						<section className={styles.section}>
							<h2>7. User Conduct</h2>
							<p>You agree not to:</p>
							<ul>
								<li>Use the Platform for any unlawful purpose</li>
								<li>Harass, abuse, or harm other users</li>
								<li>Post or transmit any harmful, threatening, or offensive content</li>
								<li>Impersonate any person or entity</li>
								<li>Interfere with or disrupt the Platform or servers</li>
								<li>Attempt to gain unauthorized access to any portion of the Platform</li>
							</ul>
						</section>

						<section className={styles.section}>
							<h2>8. Termination</h2>
							<p>
								We may terminate or suspend your account and access to the Platform immediately,
								without prior notice or liability, for any reason, including without limitation if
								you breach the Terms. Upon termination, your right to use the Platform will
								immediately cease.
							</p>
						</section>

						<section className={styles.section}>
							<h2>9. Disclaimer</h2>
							<p>
								The materials on CodeSchool's platform are provided on an 'as is' basis. CodeSchool
								makes no warranties, expressed or implied, and hereby disclaims and negates all
								other warranties including, without limitation, implied warranties or conditions of
								merchantability, fitness for a particular purpose, or non-infringement of
								intellectual property or other violation of rights.
							</p>
						</section>

						<section className={styles.section}>
							<h2>10. Limitations</h2>
							<p>
								In no event shall CodeSchool or its suppliers be liable for any damages (including,
								without limitation, damages for loss of data or profit, or due to business
								interruption) arising out of the use or inability to use the materials on
								CodeSchool's platform.
							</p>
						</section>

						<section className={styles.section}>
							<h2>11. Changes to Terms</h2>
							<p>
								CodeSchool reserves the right to revise these terms of use at any time without
								notice. By using this platform, you are agreeing to be bound by the current version
								of these terms of use.
							</p>
						</section>

						<section className={styles.section}>
							<h2>12. Contact Information</h2>
							<p>
								If you have any questions about these Terms, please contact us at:
								<br />
								<br />
								Email: <a href='mailto:legal@codeschool.com'>legal@codeschool.com</a>
								<br />
								Address: Amir Temur District, Samarqand Uzbekistan
							</p>
						</section>
					</div>
				</div>
			</Seo>
			<Footer />
			<ScrollUp />
		</>
	)
}

export default TermsPage

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	}
}
