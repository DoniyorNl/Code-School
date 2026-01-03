import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { ScrollUp } from '../components'
import Card from '../components/card/card'
import Heading from '../components/heading/heading'
import Icon from '../components/icon/DynamicIcon'
import Tag from '../components/tag/tag'
import Footer from '../layout/footer/footer'
import Header from '../layout/header/header'
import Seo from '../layout/seo/seo'
import styles from '../styles/degrees.module.css'

interface Degree {
	id: string
	title: string
	description: string
	duration: string
	level: string
	skills: string[]
	icon: string
	color: string
}

interface DegreesPageProps {
	degrees: Degree[]
}

const DegreesPage = ({ degrees }: DegreesPageProps): JSX.Element => {
	const [selectedLevel, setSelectedLevel] = useState<string>('all')

	const filteredDegrees =
		selectedLevel === 'all' ? degrees : degrees.filter(d => d.level === selectedLevel)

	return (
		<>
			<Header />
			<Seo
				metaTitle='Professional Degrees & Certifications'
				metaDescription='Master full-stack development with our comprehensive degree programs. Get industry-recognized certifications and build a successful tech career.'
				metaKeyword='programming degrees, web development certification, full-stack developer program, professional coding courses'
			>
				<div className={styles.container}>
					<div className={styles.hero}>
						<Heading tag='h1' className={styles.title}>
							Professional Degrees & Certifications
						</Heading>
						<p className={styles.subtitle}>
							Comprehensive learning paths designed to take you from beginner to professional
							developer. Get certified and stand out in the tech industry.
						</p>
					</div>

					<div className={styles.filters}>
						<button
							className={selectedLevel === 'all' ? styles.filterActive : styles.filter}
							onClick={() => setSelectedLevel('all')}
						>
							All Programs
						</button>
						<button
							className={selectedLevel === 'beginner' ? styles.filterActive : styles.filter}
							onClick={() => setSelectedLevel('beginner')}
						>
							Beginner
						</button>
						<button
							className={selectedLevel === 'intermediate' ? styles.filterActive : styles.filter}
							onClick={() => setSelectedLevel('intermediate')}
						>
							Intermediate
						</button>
						<button
							className={selectedLevel === 'advanced' ? styles.filterActive : styles.filter}
							onClick={() => setSelectedLevel('advanced')}
						>
							Advanced
						</button>
					</div>

					<div className={styles.degrees}>
						{filteredDegrees.map(degree => (
							<Card key={degree.id} className={styles.degreeCard}>
								<div className={styles.cardHeader} style={{ backgroundColor: degree.color }}>
									<Icon name={degree.icon as any} style={{ fontSize: '48px', color: '#fff' }} />
								</div>
								<div className={styles.cardBody}>
									<Heading tag='h2' className={styles.degreeTitle}>
										{degree.title}
									</Heading>
									<p className={styles.degreeDescription}>{degree.description}</p>
									<div className={styles.degreeInfo}>
										<div className={styles.infoItem}>
											<Icon name='FaClock' style={{ fontSize: '16px' }} />
											<span>{degree.duration}</span>
										</div>
										<Tag color='primary' size='s'>
											{degree.level}
										</Tag>
									</div>
									<div className={styles.skills}>
										<strong>Skills you'll gain:</strong>
										<div className={styles.skillTags}>
											{degree.skills.map(skill => (
												<Tag key={skill} size='s' color='ghost'>
													{skill}
												</Tag>
											))}
										</div>
									</div>
									<button className={styles.enrollButton}>
										Enroll Now
										<Icon name='FaRocket' style={{ fontSize: '16px', marginLeft: '8px' }} />
									</button>
								</div>
							</Card>
						))}
					</div>
				</div>
			</Seo>
			<Footer />
			<ScrollUp />
		</>
	)
}

export default DegreesPage

export const getServerSideProps: GetServerSideProps<DegreesPageProps> = async () => {
	// Mock data - real implementation would fetch from database
	const degrees: Degree[] = [
		{
			id: '1',
			title: 'Full-Stack Web Developer',
			description:
				'Master both frontend and backend development. Build complete web applications from scratch using modern technologies like React, Node.js, and databases.',
			duration: '12 months',
			level: 'beginner',
			skills: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'HTML/CSS'],
			icon: 'FaCode',
			color: '#7653FC',
		},
		{
			id: '2',
			title: 'Frontend Engineer Professional',
			description:
				'Become an expert in creating beautiful, responsive user interfaces. Learn advanced React patterns, state management, and modern CSS techniques.',
			duration: '8 months',
			level: 'intermediate',
			skills: ['React', 'TypeScript', 'Redux', 'Next.js', 'Tailwind', 'Testing'],
			icon: 'FaReact',
			color: '#61DAFB',
		},
		{
			id: '3',
			title: 'Backend Systems Architect',
			description:
				'Design and build scalable backend systems. Master databases, APIs, microservices architecture, and cloud deployment strategies.',
			duration: '10 months',
			level: 'advanced',
			skills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Microservices', 'Security'],
			icon: 'SiNodedotjs',
			color: '#339933',
		},
		{
			id: '4',
			title: 'Mobile App Developer',
			description:
				'Create native mobile applications for iOS and Android. Learn React Native and mobile-specific design patterns and best practices.',
			duration: '9 months',
			level: 'intermediate',
			skills: ['React Native', 'Mobile UI', 'Firebase', 'Redux', 'Native APIs', 'App Store'],
			icon: 'FaMobileAlt',
			color: '#FF6B35',
		},
		{
			id: '5',
			title: 'DevOps & Cloud Engineer',
			description:
				'Master deployment, monitoring, and scaling applications. Learn Docker, Kubernetes, CI/CD pipelines, and cloud platforms.',
			duration: '7 months',
			level: 'advanced',
			skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Monitoring', 'Infrastructure'],
			icon: 'FaCog',
			color: '#1CC5DC',
		},
		{
			id: '6',
			title: 'UI/UX Designer & Developer',
			description:
				'Combine design skills with coding. Create stunning user experiences and implement them with modern frontend technologies.',
			duration: '6 months',
			level: 'beginner',
			skills: ['Figma', 'HTML/CSS', 'JavaScript', 'Design Systems', 'Prototyping', 'User Research'],
			icon: 'FaFigma',
			color: '#F24E1E',
		},
	]

	return {
		props: {
			degrees,
		},
	}
}
