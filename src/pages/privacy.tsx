import { GetServerSideProps } from 'next'
import { ScrollUp } from '../components'
import Heading from '../components/heading/heading'
import Footer from '../layout/footer/footer'
import Header from '../layout/header/header'
import Seo from '../layout/seo/seo'
import styles from '../styles/legal.module.css'

interface PrivacyPageProps {}

const PrivacyPage = ({}: PrivacyPageProps): JSX.Element => {
	return (
		<>
			<Header />
			<Seo
				metaTitle='Privacy Policy - CodeSchool'
				metaDescription='Learn how CodeSchool collects, uses, and protects your personal information. Read our comprehensive privacy policy.'
				metaKeyword='privacy policy, data protection, personal information, GDPR, data security'
			>
				<div className={styles.container}>
					<div className={styles.hero}>
						<Heading tag='h1' className={styles.title}>
							Privacy Policy
						</Heading>
						<p className={styles.lastUpdated}>Last Updated: January 1, 2026</p>
					</div>

					<div className={styles.content}>
						<section className={styles.section}>
							<h2>1. Introduction</h2>
							<p>
								CodeSchool ("we," "our," or "us") is committed to protecting your privacy. This
								Privacy Policy explains how we collect, use, disclose, and safeguard your
								information when you use our platform. Please read this privacy policy carefully.
							</p>
						</section>

						<section className={styles.section}>
							<h2>2. Information We Collect</h2>
							<h3>Personal Information</h3>
							<p>We may collect personal information that you provide to us, including:</p>
							<ul>
								<li>Name and contact information (email, phone number, address)</li>
								<li>Account credentials (username, password)</li>
								<li>Payment information (credit card details, billing address)</li>
								<li>Profile information (photo, bio, social media links)</li>
								<li>Educational background and interests</li>
							</ul>

							<h3>Automatically Collected Information</h3>
							<p>When you access our platform, we automatically collect:</p>
							<ul>
								<li>IP address and device information</li>
								<li>Browser type and version</li>
								<li>Operating system</li>
								<li>Access times and referring website addresses</li>
								<li>Pages viewed and links clicked</li>
								<li>Course progress and completion data</li>
							</ul>
						</section>

						<section className={styles.section}>
							<h2>3. How We Use Your Information</h2>
							<p>We use the information we collect to:</p>
							<ul>
								<li>Provide, operate, and maintain our platform</li>
								<li>Process your transactions and manage your orders</li>
								<li>Send you course updates, notifications, and educational content</li>
								<li>Respond to your comments, questions, and customer service requests</li>
								<li>Personalize your learning experience</li>
								<li>Analyze usage patterns and improve our services</li>
								<li>Detect, prevent, and address technical issues and security threats</li>
								<li>Comply with legal obligations</li>
								<li>Send marketing and promotional communications (with your consent)</li>
							</ul>
						</section>

						<section className={styles.section}>
							<h2>4. Sharing Your Information</h2>
							<p>We may share your information with:</p>
							<ul>
								<li>
									<strong>Service Providers:</strong> Third-party vendors who perform services on
									our behalf (payment processing, hosting, analytics)
								</li>
								<li>
									<strong>Instructors:</strong> Course instructors may access your progress and
									performance data
								</li>
								<li>
									<strong>Business Partners:</strong> With your consent, for joint promotions or
									services
								</li>
								<li>
									<strong>Legal Requirements:</strong> When required by law or to protect our rights
								</li>
								<li>
									<strong>Business Transfers:</strong> In connection with a merger, acquisition, or
									sale of assets
								</li>
							</ul>
							<p>We do not sell your personal information to third parties.</p>
						</section>

						<section className={styles.section}>
							<h2>5. Cookies and Tracking Technologies</h2>
							<p>
								We use cookies and similar tracking technologies to track activity on our platform
								and store certain information. Types of cookies we use:
							</p>
							<ul>
								<li>
									<strong>Essential Cookies:</strong> Required for the platform to function properly
								</li>
								<li>
									<strong>Performance Cookies:</strong> Help us understand how visitors use our
									platform
								</li>
								<li>
									<strong>Functionality Cookies:</strong> Remember your preferences and settings
								</li>
								<li>
									<strong>Marketing Cookies:</strong> Track your activity to show relevant
									advertisements
								</li>
							</ul>
							<p>You can control cookies through your browser settings.</p>
						</section>

						<section className={styles.section}>
							<h2>6. Data Security</h2>
							<p>
								We implement appropriate technical and organizational security measures to protect
								your personal information, including:
							</p>
							<ul>
								<li>Encryption of data in transit and at rest</li>
								<li>Regular security audits and vulnerability assessments</li>
								<li>Access controls and authentication requirements</li>
								<li>Employee training on data protection</li>
								<li>Secure backup and disaster recovery procedures</li>
							</ul>
							<p>
								However, no method of transmission over the Internet is 100% secure, and we cannot
								guarantee absolute security.
							</p>
						</section>

						<section className={styles.section}>
							<h2>7. Your Rights and Choices</h2>
							<p>You have the right to:</p>
							<ul>
								<li>
									<strong>Access:</strong> Request a copy of your personal information
								</li>
								<li>
									<strong>Correction:</strong> Update or correct inaccurate information
								</li>
								<li>
									<strong>Deletion:</strong> Request deletion of your personal information
								</li>
								<li>
									<strong>Opt-Out:</strong> Unsubscribe from marketing communications
								</li>
								<li>
									<strong>Data Portability:</strong> Receive your data in a portable format
								</li>
								<li>
									<strong>Object:</strong> Object to processing of your personal information
								</li>
							</ul>
							<p>
								To exercise these rights, contact us at{' '}
								<a href='mailto:privacy@codeschool.com'>privacy@codeschool.com</a>
							</p>
						</section>

						<section className={styles.section}>
							<h2>8. Children's Privacy</h2>
							<p>
								Our platform is not intended for children under 13 years of age. We do not knowingly
								collect personal information from children under 13. If you are a parent or guardian
								and believe your child has provided us with personal information, please contact us.
							</p>
						</section>

						<section className={styles.section}>
							<h2>9. International Data Transfers</h2>
							<p>
								Your information may be transferred to and maintained on servers located outside of
								your country. By using our platform, you consent to the transfer of information to
								countries that may have different data protection laws than your country.
							</p>
						</section>

						<section className={styles.section}>
							<h2>10. Third-Party Links</h2>
							<p>
								Our platform may contain links to third-party websites. We are not responsible for
								the privacy practices of these websites. We encourage you to read the privacy
								policies of any third-party sites you visit.
							</p>
						</section>

						<section className={styles.section}>
							<h2>11. Changes to This Privacy Policy</h2>
							<p>
								We may update this Privacy Policy from time to time. We will notify you of any
								changes by posting the new Privacy Policy on this page and updating the "Last
								Updated" date. Your continued use of the platform after changes constitutes
								acceptance of the updated policy.
							</p>
						</section>

						<section className={styles.section}>
							<h2>12. Contact Us</h2>
							<p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
							<br />
							<p>
								<strong>Email:</strong>{' '}
								<a href='mailto:privacy@codeschool.com'>privacy@codeschool.com</a>
								<br />
								<strong>Address:</strong> Amir Temur District, Samarqand Uzbekistan
								<br />
								<strong>Phone:</strong> +998 (90) 123-45-67
							</p>
						</section>

						<section className={styles.section}>
							<h2>13. GDPR Compliance (for EU Users)</h2>
							<p>
								If you are located in the European Economic Area (EEA), you have additional rights
								under the General Data Protection Regulation (GDPR):
							</p>
							<ul>
								<li>Right to be informed about data collection and use</li>
								<li>Right to access your personal data</li>
								<li>Right to rectification of inaccurate data</li>
								<li>Right to erasure ("right to be forgotten")</li>
								<li>Right to restrict processing</li>
								<li>Right to data portability</li>
								<li>Right to object to processing</li>
								<li>Rights related to automated decision-making and profiling</li>
							</ul>
						</section>
					</div>
				</div>
			</Seo>
			<Footer />
			<ScrollUp />
		</>
	)
}

export default PrivacyPage

export const getServerSideProps: GetServerSideProps<PrivacyPageProps> = async () => {
	return {
		props: {},
	}
}
