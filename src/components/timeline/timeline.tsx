import styles from './timeline.module.css'
import { TimelineItemProps, TimelineProps } from './timeline.props'

export const Timeline = ({ children }: TimelineProps): JSX.Element => {
	return (
		<div className={styles.timeline}>
			<div className={styles.timelineLine}></div>
			{children}
		</div>
	)
}

export const TimelineItem = ({ title, icon, children }: TimelineItemProps): JSX.Element => {
	return (
		<div className={styles.timelineItem}>
			<div className={styles.timelineIcon}>{icon}</div>
			<div className={styles.timelineContent}>
				<h3 className={styles.timelineTitle}>{title}</h3>
				<div className={styles.timelineText}>{children}</div>
			</div>
		</div>
	)
}

export default Timeline
