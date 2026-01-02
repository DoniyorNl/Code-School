import cn from 'classnames'

import Button from '../button/button'
import styles from './error-message.module.css'
import { ErrorMessageProps } from './error-message.props'

export const ErrorMessage = ({
	title,
	message,
	onRetry,
	className,
}: ErrorMessageProps): JSX.Element => {
	return (
		<div className={cn(styles.errorMessage, className)} role='alert' aria-live='assertive'>
			<div className={styles.iconWrapper}>
				<svg
					width='64'
					height='64'
					viewBox='0 0 64 64'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<circle cx='32' cy='32' r='30' stroke='#FC836D' strokeWidth='4' />
					<path d='M32 20V36' stroke='#FC836D' strokeWidth='4' strokeLinecap='round' />
					<circle cx='32' cy='44' r='2' fill='#FC836D' />
				</svg>
			</div>
			<h2 className={styles.title}>{title || 'Xatolik yuz berdi'}</h2>
			<p className={styles.message}>
				{message || "Ma'lumotlarni yuklashda muammo yuz berdi. Iltimos, qaytadan urinib ko'ring."}
			</p>
			{onRetry && (
				<Button appearance='primary' onClick={onRetry} className={styles.retryButton}>
					Qaytadan urinish
				</Button>
			)}
		</div>
	)
}

export default ErrorMessage
