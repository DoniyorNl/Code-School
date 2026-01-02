import axios from 'axios'
import cn from 'classnames'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, TextArea } from '..'
import {
	descriptionValidation,
	nameValidation,
	ratingValidation,
	sanitizeInput,
	titleValidation,
} from '../../helpers/validation'
import Input from '../input/input'
import Rating from '../rating/rating'
import CloseIcon from './close.svg'
import { IReviewForm } from './review-form.interface'
import styles from './review-form.module.css'
import { IReviewResponse, ReviewFormProps } from './review-form.props'

const ReivewForm = ({ productid, className, ...props }: ReviewFormProps): JSX.Element => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<IReviewForm>()

	const onSubmit = async (formData: IReviewForm) => {
		setError(false)
		setIsSuccess(false)
		setIsSubmitting(true)
		try {
			// Sanitize inputs before sending
			const sanitizedData = {
				name: sanitizeInput(formData.name),
				title: sanitizeInput(formData.title),
				description: sanitizeInput(formData.description),
				rating: formData.rating,
			}

			const { status } = await axios.post<IReviewResponse>(`${process.env.NEXT_PUBLIC_API}/posts`, {
				...sanitizedData,
				productId: productid,
			})
			if (status === 201) {
				setIsSuccess(true)
				reset()
			}
		} catch (err) {
			console.error('Review submission error:', err)
			setError(true)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					placeholder='Ismingiz'
					className={styles.name}
					error={errors.name}
					aria-invalid={!!errors.name}
					aria-describedby={errors.name ? 'name-error' : undefined}
					{...register('name', nameValidation)}
				/>
				{errors.name && (
					<span id='name-error' className={styles.errorMessage} role='alert'>
						{errors.name.message}
					</span>
				)}

				<Input
					placeholder='Sarlavha'
					className={styles.title}
					error={errors.title}
					aria-invalid={!!errors.title}
					aria-describedby={errors.title ? 'title-error' : undefined}
					{...register('title', titleValidation)}
				/>
				{errors.title && (
					<span id='title-error' className={styles.errorMessage} role='alert'>
						{errors.title.message}
					</span>
				)}

				<div className={styles.rating}>
					<span>Baho: </span>
					<Controller
						control={control}
						name={'rating'}
						rules={ratingValidation}
						render={({ field }) => (
							<Rating
								isEditabled
								rating={field.value}
								error={errors.rating}
								ref={field.ref}
								setRating={field.onChange}
								aria-invalid={!!errors.rating}
							/>
						)}
					/>
				</div>
				{errors.rating && (
					<span className={styles.errorMessage} role='alert'>
						{errors.rating.message}
					</span>
				)}

				<TextArea
					placeholder='Izohingiz (kamida 10 ta belgi)'
					className={styles.description}
					error={errors.description}
					aria-invalid={!!errors.description}
					aria-describedby={errors.description ? 'description-error' : undefined}
					{...register('description', descriptionValidation)}
				/>
				{errors.description && (
					<span id='description-error' className={styles.errorMessage} role='alert'>
						{errors.description.message}
					</span>
				)}
				<div className={styles.submit}>
					<Button appearance='primary' disabled={isSubmitting} aria-busy={isSubmitting}>
						{isSubmitting ? 'Yuborilmoqda...' : 'Submit'}
					</Button>
					<span className={styles.info}></span>
				</div>
			</div>

			{isSuccess && (
				<div className={cn(styles.success, styles.panel)} role='alert' aria-live='polite'>
					<div className={styles.successTitle}>Sharh muvaffaqiyatli yuborildi</div>
					<div>Rahmat! Sharhingiz tekshiruvdan so'ng chop etiladi</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setIsSuccess(false)}
						role='button'
						tabIndex={0}
						onKeyDown={(e: React.KeyboardEvent) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								setIsSuccess(false)
							}
						}}
						aria-label='Muvaffaqiyat xabarini yopish'
					/>
				</div>
			)}

			{error && (
				<div className={cn(styles.error, styles.panel)} role='alert' aria-live='assertive'>
					<div className={styles.successTitle}>Xatolik yuz berdi</div>
					<div>Iltimos, qaytadan urinib ko'ring</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setError(false)}
						role='button'
						tabIndex={0}
						onKeyDown={(e: React.KeyboardEvent) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								setError(false)
							}
						}}
						aria-label='Xato xabarini yopish'
					/>
				</div>
			)}
		</form>
	)
}

export default ReivewForm
