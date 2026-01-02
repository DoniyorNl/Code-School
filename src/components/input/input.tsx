import cn from 'classnames'
import { ForwardedRef, forwardRef } from 'react'
import styles from './input.module.css'
import { InputProps } from './input.props'

const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	): JSX.Element => {
		const errorId = error ? `error-${Math.random().toString(36).substr(2, 9)}` : undefined
		return (
			<div className={styles.inputWrapper}>
				<input
					className={cn(styles.input, className, {
						[styles.error]: error,
					})}
					{...props}
					ref={ref}
					aria-invalid={!!error}
					aria-describedby={error ? errorId : undefined}
				/>
				{error && (
					<span className={styles.errorMessage} id={errorId} role='alert'>
						{error.message}
					</span>
				)}
			</div>
		)
	},
)

export default Input
