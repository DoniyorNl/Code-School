import cn from 'classnames'
import { format } from 'date-fns'
import Icon from '../../components/icon/DynamicIcon'
import styles from './footer.module.css'
import { FooterProps } from './footer.props'

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div className={styles.topSection}>
				<div className={styles.logo}>CodeSchool</div>
				<nav className={styles.navLinks}>
					<a href='/courses' className={styles.link}>
						<Icon name='FaBook' /> Courses
					</a>
					<a href='/degrees' className={styles.link}>
						<Icon name='FaGraduationCap' /> Degrees
					</a>
					<a href='/webinars' className={styles.link}>
						<Icon name='FaChalkboardTeacher' /> Webinars
					</a>
					<a href='/contact' className={styles.link}>
						<Icon name='FaEnvelope' /> Contact
					</a>
				</nav>
			</div>
			<div className={styles.bottomSection}>
				<p className={styles.copy}> © 2023 - {format(new Date(), 'yyyy')}. All rights reserved.</p>
				<div className={styles.policyLinks}>
					<a href='/terms' className={styles.policy}>
						Terms of Use
					</a>
					<a href='/privacy' className={styles.policy}>
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
