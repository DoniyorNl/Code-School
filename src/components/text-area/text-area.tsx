import cn from 'classnames'
import { ForwardedRef, forwardRef } from 'react'
import styles from './text-area.module.css'
import { TextAreaProps } from './text-area.props'

const Input = forwardRef(
	(
		{ className, error, ...props }: TextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>,
	): JSX.Element => {
		const errorId = error ? `error-${Math.random().toString(36).substr(2, 9)}` : undefined
		return (
			<div className={cn(styles.textAreaWrapper, className)}>
				<textarea
					className={cn(styles.textArea, {
						[styles.error]: error,
					})}
					ref={ref}
					aria-invalid={!!error}
					aria-describedby={error ? errorId : undefined}
					{...props}
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
