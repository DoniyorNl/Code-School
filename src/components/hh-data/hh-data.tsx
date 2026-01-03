import Card from '../card/card'
import Icon from '../icon/DynamicIcon'
import styles from './hh-data.module.css'
import { IhhData } from './hh-data.props'
export default function HhData({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary,
}: IhhData): JSX.Element {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>All Vacation</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Junior</div>
					<div className={styles.salaryValue}>{juniorSalary}$</div>
					<div className={styles.rate}>
						<Icon name='MdStar' size={40} color='red' />
						<Icon name='MdStar' size={40} />
						<Icon name='MdStar' size={40} />
					</div>
				</div>
				<div>
					<div className={styles.title}>Middle</div>
					<div className={styles.salaryValue}>{middleSalary}$</div>
					<div className={styles.rate}>
						<Icon name='MdStar' size={40} color='red' />
						<Icon name='MdStar' size={40} color='red' />
						<Icon name='MdStar' size={40} />
					</div>
				</div>
				<div>
					<div className={styles.title}>Senior</div>
					<div className={styles.salaryValue}>{seniorSalary}$</div>
					<div className={styles.rate}>
						<Icon name='MdStar' size={40} color='red' />
						<Icon name='MdStar' size={40} color='red' />
						<Icon name='MdStar' size={40} color='red' />
					</div>
				</div>
			</Card>
		</div>
	)
}
