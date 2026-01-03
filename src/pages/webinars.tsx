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
import styles from '../styles/webinars.module.css'

interface Webinar {
	id: string
	title: string
	description: string
	speaker: string
	speakerRole: string
	date: string
	time: string
	duration: string
	topics: string[]
	level: string
	registeredCount: number
	maxAttendees: number
	status: 'upcoming' | 'live' | 'completed'
	thumbnail: string
}

interface WebinarsPageProps {
	webinars: Webinar[]
}

const WebinarsPage = ({ webinars }: WebinarsPageProps): JSX.Element => {
	const [selectedStatus, setSelectedStatus] = useState<string>('upcoming')

	const filteredWebinars = webinars.filter(w => w.status === selectedStatus)

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'upcoming':
				return 'primary'
			case 'live':
				return 'red'
			case 'completed':
				return 'ghost'
			default:
				return 'ghost'
		}
	}

	return (
		<>
			<Header />
			<Seo
				metaTitle='Live Webinars & Online Events'
				metaDescription='Join our live webinars and learn from industry experts. Interactive sessions on web development, programming best practices, and career guidance.'
				metaKeyword='programming webinars, live coding sessions, tech talks, developer events, online workshops'
			>
				<div className={styles.container}>
					<div className={styles.hero}>
						<Heading tag='h1' className={styles.title}>
							Live Webinars & Events
						</Heading>
						<p className={styles.subtitle}>
							Join interactive live sessions with industry experts. Ask questions, share ideas, and
							learn the latest technologies in real-time.
						</p>
					</div>

					<div className={styles.tabs}>
						<button
							className={selectedStatus === 'upcoming' ? styles.tabActive : styles.tab}
							onClick={() => setSelectedStatus('upcoming')}
						>
							<Icon name='FaRocket' style={{ fontSize: '18px', marginRight: '8px' }} />
							Upcoming ({webinars.filter(w => w.status === 'upcoming').length})
						</button>
						<button
							className={selectedStatus === 'live' ? styles.tabActive : styles.tab}
							onClick={() => setSelectedStatus('live')}
						>
							<Icon name='FaBullhorn' style={{ fontSize: '18px', marginRight: '8px' }} />
							Live Now ({webinars.filter(w => w.status === 'live').length})
						</button>
						<button
							className={selectedStatus === 'completed' ? styles.tabActive : styles.tab}
							onClick={() => setSelectedStatus('completed')}
						>
							<Icon name='FaCheck' style={{ fontSize: '18px', marginRight: '8px' }} />
							Past Events ({webinars.filter(w => w.status === 'completed').length})
						</button>
					</div>

					<div className={styles.webinars}>
						{filteredWebinars.length === 0 ? (
							<div className={styles.empty}>
								<Icon name='FaChalkboardTeacher' style={{ fontSize: '64px', color: '#ccc' }} />
								<p>No {selectedStatus} webinars at the moment.</p>
							</div>
						) : (
							filteredWebinars.map(webinar => (
								<Card key={webinar.id} className={styles.webinarCard}>
									<div className={styles.cardHeader}>
										<Tag color={getStatusColor(webinar.status)} size='s'>
											{webinar.status === 'live' ? '🔴 LIVE NOW' : webinar.status.toUpperCase()}
										</Tag>
										<Tag color='ghost' size='s'>
											{webinar.level}
										</Tag>
									</div>

									<Heading tag='h2' className={styles.webinarTitle}>
										{webinar.title}
									</Heading>

									<p className={styles.webinarDescription}>{webinar.description}</p>

									<div className={styles.speakerInfo}>
										<div className={styles.speakerAvatar}>
											<Icon name='FaUser' style={{ fontSize: '24px' }} />
										</div>
										<div>
											<div className={styles.speakerName}>{webinar.speaker}</div>
											<div className={styles.speakerRole}>{webinar.speakerRole}</div>
										</div>
									</div>

									<div className={styles.webinarDetails}>
										<div className={styles.detailItem}>
											<Icon name='FaCalendar' style={{ fontSize: '14px' }} />
											<span>{webinar.date}</span>
										</div>
										<div className={styles.detailItem}>
											<Icon name='FaClock' style={{ fontSize: '14px' }} />
											<span>
												{webinar.time} ({webinar.duration})
											</span>
										</div>
										<div className={styles.detailItem}>
											<Icon name='FaUser' style={{ fontSize: '14px' }} />
											<span>
												{webinar.registeredCount}/{webinar.maxAttendees} registered
											</span>
										</div>
									</div>

									<div className={styles.topics}>
										<strong>Topics:</strong>
										<div className={styles.topicTags}>
											{webinar.topics.map(topic => (
												<Tag key={topic} size='s' color='ghost'>
													{topic}
												</Tag>
											))}
										</div>
									</div>

									<button
										className={
											webinar.status === 'live'
												? styles.joinButton
												: webinar.status === 'upcoming'
													? styles.registerButton
													: styles.watchButton
										}
									>
										{webinar.status === 'live' ? (
											<>
												Join Now
												<Icon name='FaBullhorn' style={{ fontSize: '16px', marginLeft: '8px' }} />
											</>
										) : webinar.status === 'upcoming' ? (
											<>
												Register Free
												<Icon name='FaRocket' style={{ fontSize: '16px', marginLeft: '8px' }} />
											</>
										) : (
											<>
												Watch Recording
												<Icon name='FaBook' style={{ fontSize: '16px', marginLeft: '8px' }} />
											</>
										)}
									</button>
								</Card>
							))
						)}
					</div>
				</div>
			</Seo>
			<Footer />
			<ScrollUp />
		</>
	)
}

export default WebinarsPage

export const getServerSideProps: GetServerSideProps<WebinarsPageProps> = async () => {
	const webinars: Webinar[] = [
		{
			id: '1',
			title: 'Building Production-Ready React Applications',
			description:
				"Learn best practices for building scalable React apps. We'll cover performance optimization, state management, and deployment strategies.",
			speaker: 'Sarah Johnson',
			speakerRole: 'Senior Frontend Engineer at Google',
			date: 'January 15, 2026',
			time: '18:00 UTC',
			duration: '90 min',
			topics: ['React', 'Performance', 'Best Practices', 'Deployment'],
			level: 'Intermediate',
			registeredCount: 145,
			maxAttendees: 200,
			status: 'upcoming',
			thumbnail: '',
		},
		{
			id: '2',
			title: 'Microservices Architecture Deep Dive',
			description:
				'Understanding microservices patterns, service communication, API gateways, and how to design resilient distributed systems.',
			speaker: 'Michael Chen',
			speakerRole: 'Cloud Architect at AWS',
			date: 'January 8, 2026',
			time: '16:00 UTC',
			duration: '2 hours',
			topics: ['Microservices', 'Architecture', 'Docker', 'Kubernetes'],
			level: 'Advanced',
			registeredCount: 89,
			maxAttendees: 150,
			status: 'live',
			thumbnail: '',
		},
		{
			id: '3',
			title: 'Getting Started with TypeScript',
			description:
				'A beginner-friendly introduction to TypeScript. Learn types, interfaces, generics, and how TypeScript improves your code quality.',
			speaker: 'Emma Williams',
			speakerRole: 'Tech Lead at Microsoft',
			date: 'January 20, 2026',
			time: '19:00 UTC',
			duration: '60 min',
			topics: ['TypeScript', 'JavaScript', 'Types', 'Best Practices'],
			level: 'Beginner',
			registeredCount: 234,
			maxAttendees: 300,
			status: 'upcoming',
			thumbnail: '',
		},
		{
			id: '4',
			title: 'Modern CSS Techniques & Animations',
			description:
				'Master modern CSS with Grid, Flexbox, custom properties, and create stunning animations that bring your designs to life.',
			speaker: 'David Martinez',
			speakerRole: 'UI/UX Designer at Figma',
			date: 'December 28, 2025',
			time: '17:00 UTC',
			duration: '75 min',
			topics: ['CSS', 'Animations', 'Grid', 'Flexbox'],
			level: 'Intermediate',
			registeredCount: 178,
			maxAttendees: 200,
			status: 'completed',
			thumbnail: '',
		},
		{
			id: '5',
			title: 'Career Path: From Junior to Senior Developer',
			description:
				'Learn what it takes to advance your career in tech. Tips on building portfolio, interviewing, networking, and continuous learning.',
			speaker: 'Jessica Brown',
			speakerRole: 'Engineering Manager at Meta',
			date: 'January 25, 2026',
			time: '18:30 UTC',
			duration: '90 min',
			topics: ['Career', 'Interview', 'Skills', 'Growth'],
			level: 'Beginner',
			registeredCount: 312,
			maxAttendees: 500,
			status: 'upcoming',
			thumbnail: '',
		},
		{
			id: '6',
			title: 'Next.js 15: New Features & Best Practices',
			description:
				"Explore the latest features in Next.js 15. We'll cover Server Components, streaming, caching strategies, and migration tips.",
			speaker: 'Alex Thompson',
			speakerRole: 'Full-Stack Developer at Vercel',
			date: 'December 20, 2025',
			time: '16:30 UTC',
			duration: '2 hours',
			topics: ['Next.js', 'React', 'SSR', 'Server Components'],
			level: 'Advanced',
			registeredCount: 156,
			maxAttendees: 200,
			status: 'completed',
			thumbnail: '',
		},
	]

	return {
		props: {
			webinars,
		},
	}
}
