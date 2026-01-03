import { Card, Heading, Text } from '../../components'
import Icon from '../../components/icon/DynamicIcon'
import styles from './about-page-component.module.css'

const AboutPageComponent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.hero}>
				<Heading tag='h1'>About CodeSchool Academy</Heading>
				<Text className={styles.subtitle}>
					Empowering learners worldwide with quality online education
				</Text>
			</div>

			<section className={styles.mission}>
				<Card color='white' className={styles.card}>
					<div className={styles.iconWrapper}>
						<Icon name='FaGraduationCap' />
					</div>
					<Heading tag='h2'>Our Mission</Heading>
					<Text>
						We are dedicated to providing accessible, high-quality education to learners around the
						world. Our mission is to empower individuals with the skills and knowledge they need to
						succeed in the digital age.
					</Text>
				</Card>

				<Card color='white' className={styles.card}>
					<div className={styles.iconWrapper}>
						<Icon name='FaLightbulb' />
					</div>
					<Heading tag='h2'>Our Vision</Heading>
					<Text>
						To become the leading platform for online learning, where students can access
						world-class courses in programming, design, business, and more. We believe education
						should be accessible to everyone, regardless of location or background.
					</Text>
				</Card>

				<Card color='white' className={styles.card}>
					<div className={styles.iconWrapper}>
						<Icon name='FaRocket' />
					</div>
					<Heading tag='h2'>Our Values</Heading>
					<Text>
						Excellence, Innovation, Accessibility, and Community. We strive to deliver exceptional
						learning experiences through cutting-edge technology and expert instruction, while
						fostering a supportive learning community.
					</Text>
				</Card>
			</section>

			<section className={styles.stats}>
				<div className={styles.stat}>
					<Heading tag='h3'>10,000+</Heading>
					<Text>Active Students</Text>
				</div>
				<div className={styles.stat}>
					<Heading tag='h3'>100+</Heading>
					<Text>Expert Instructors</Text>
				</div>
				<div className={styles.stat}>
					<Heading tag='h3'>50+</Heading>
					<Text>Quality Courses</Text>
				</div>
				<div className={styles.stat}>
					<Heading tag='h3'>95%</Heading>
					<Text>Satisfaction Rate</Text>
				</div>
			</section>

			<section className={styles.story}>
				<Heading tag='h2'>Our Story</Heading>
				<Text>
					CodeSchool Academy was founded with a simple belief: that quality education should be
					accessible to everyone. What started as a small project has grown into a thriving
					community of learners and educators from around the world.
				</Text>
				<Text>
					Today, we offer a wide range of courses in programming, web development, data science,
					design, and business. Our expert instructors bring real-world experience to every lesson,
					ensuring that our students gain practical skills they can apply immediately.
				</Text>
				<Text>
					We're proud of the thousands of students who have transformed their careers through our
					platform, and we're committed to continuing our mission of making education accessible to
					all.
				</Text>
			</section>
		</div>
	)
}

export default AboutPageComponent
