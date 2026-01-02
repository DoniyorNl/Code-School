import cn from 'classnames'

import styles from './loading-spinner.module.css'
import { LoadingSpinnerProps } from './loading-spinner.props'

export const LoadingSpinner = ({
	size = 'medium',
	className,
}: LoadingSpinnerProps): JSX.Element => {
	return (
		<div
			className={cn(styles.spinner, className, {
				[styles.small]: size === 'small',
				[styles.medium]: size === 'medium',
				[styles.large]: size === 'large',
			})}
			role='status'
			aria-label='Yuklanmoqda'
		>
			<div className={styles.spinnerCircle} />
		</div>
	)
}

export default LoadingSpinner
