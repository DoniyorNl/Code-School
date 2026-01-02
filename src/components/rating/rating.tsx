import cn from 'classnames'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import styles from './rating.module.css'
import { RatingProps } from './rating.props'
import StarIcon from './star.svg'

const Rating = forwardRef(
	(
		{ rating, isEditabled = false, setRating, error, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>,
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

		useEffect(() => {
			renderRating(rating)
		}, [rating])

		const renderRating = (currentRating: number) => {
			const updateArray = ratingArray.map((r: JSX.Element, idx: number) => (
				<span
					className={cn(styles.star, {
						[styles.filled]: idx < currentRating,
						[styles.editable]: isEditabled,
					})}
					onMouseEnter={() => chnageRatingDisplay(idx + 1)}
					onMouseLeave={() => chnageRatingDisplay(rating)}
					onClick={() => clickRatingHandler(idx + 1)}
					onKeyDown={e => handleKeyDown(e, idx + 1)}
					tabIndex={isEditabled ? 0 : -1}
					role={isEditabled ? 'button' : undefined}
					aria-label={`Rate ${idx + 1} out of 5 stars`}
				>
					<StarIcon />
				</span>
			))

			setRatingArray(updateArray)
		}

		const chnageRatingDisplay = (index: number) => {
			if (!isEditabled) {
				return
			}

			renderRating(index)
		}

		const clickRatingHandler = (index: number) => {
			if (!isEditabled || !setRating) {
				return
			}
			setRating(index)
		}

		const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
			if (!isEditabled || !setRating) {
				return
			}
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				setRating(index)
			} else if (e.key === 'ArrowRight' && index < 5) {
				e.preventDefault()
				setRating(index + 1)
			} else if (e.key === 'ArrowLeft' && index > 1) {
				e.preventDefault()
				setRating(index - 1)
			}
		}

		return (
			<div
				className={cn(styles.rating, {
					[styles.error]: error,
				})}
				ref={ref}
				role='group'
				aria-label='Rating'
				{...props}
			>
				{ratingArray.map((rating, idx) => (
					<span key={idx}>{rating}</span>
				))}
				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		)
	},
)

export default Rating
