import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Button, Card, Heading, Text, Timeline, TimelineItem } from '../../components'
import HeroIllustration from '../../components/hero-illustration/hero-illustration'
import Icon from '../../components/icon/DynamicIcon'
import { company, timeLineList } from '../../helpers/constants'
import Footer from '../../layout/footer/footer'
import styles from './home-page-component.module.css'

const HomePageComponent = () => {
	const router = useRouter()
	return (
		<div className={styles.home}>
			<div className={styles.hero}>
				<div className={styles.heroTitle}>
					<Heading tag='h1'>
						Lern New Skills Online With [CodeSchool] <span>Academy</span>
					</Heading>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla adipisci temporibus
						ad, veniam blanditiis optio voluptatibus eius id, eaque, ex aperiam quam voluptatum
						deleniti quos? Quis voluptatum rem quaerat.
					</Text>
					<Button
						appearance='ghost'
						arrow='right'
						style={{ border: '1px solid yellowgreen', color: 'yellowgreen' }}
						onClick={() => router.push('/contact')}
					>
						Join for free
					</Button>
				</div>
				<div className={styles.heroImage}>
					<HeroIllustration />
				</div>
			</div>
			<div className={styles.company}>
				<Heading tag='h2'>Trusted by the world's best</Heading>
				<div className={styles.companyIcon}>
					{company.map((icon, idx) => (
						<Fragment key={idx}>{icon}</Fragment>
					))}
				</div>
			</div>
			<div className={styles.timeline}>
				<Heading tag='h2'>What we can teach you</Heading>
				<div className={styles.timelineCard}>
					<Timeline>
						{timeLineList.map(({ Icon: iconName, title, text }, idx) => (
							<TimelineItem key={idx} title={title} icon={<Icon name={iconName as any} />}>
								<Card color='white' style={{ padding: 20 }}>
									<Text>{text}</Text>
								</Card>
							</TimelineItem>
						))}
					</Timeline>
				</div>
				<div className={styles.mobileTimeline}>
					{timeLineList.map((data, idx) => (
						<Card color='white' style={{ padding: 20 }} className={styles.card} key={idx}>
							<Heading tag='h3'>{data.title}</Heading>
							<Text>{data.text}</Text>
						</Card>
					))}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default HomePageComponent
