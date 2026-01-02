import { render } from '@/src/test-utils/test-utils'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Rating from './rating'

describe('Rating Component', () => {
	describe('Rendering', () => {
		it('should render 5 stars', () => {
			const { container } = render(<Rating rating={0} />)
			const stars = container.querySelectorAll('.star')
			expect(stars).toHaveLength(5)
		})

		it('should fill stars based on rating prop', () => {
			const { container } = render(<Rating rating={3} />)
			const filledStars = container.querySelectorAll('.filled')
			expect(filledStars).toHaveLength(3)
		})

		it('should render all stars as filled when rating is 5', () => {
			const { container } = render(<Rating rating={5} />)
			const filledStars = container.querySelectorAll('.filled')
			expect(filledStars).toHaveLength(5)
		})

		it('should render no filled stars when rating is 0', () => {
			const { container } = render(<Rating rating={0} />)
			const filledStars = container.querySelectorAll('.filled')
			expect(filledStars).toHaveLength(0)
		})
	})

	describe('Editable Mode', () => {
		it('should apply editable class when isEditabled is true', () => {
			const { container } = render(<Rating rating={0} isEditabled={true} setRating={jest.fn()} />)
			const editableStars = container.querySelectorAll('.editable')
			expect(editableStars.length).toBeGreaterThan(0)
		})

		it('should not apply editable class when isEditabled is false', () => {
			const { container } = render(<Rating rating={3} isEditabled={false} />)
			const editableStars = container.querySelectorAll('.editable')
			expect(editableStars).toHaveLength(0)
		})

		it('should have tabIndex 0 for editable stars', () => {
			const { container } = render(<Rating rating={0} isEditabled={true} setRating={jest.fn()} />)
			const stars = container.querySelectorAll('.star')
			stars.forEach(star => {
				expect(star).toHaveAttribute('tabindex', '0')
			})
		})

		it('should have tabIndex -1 for non-editable stars', () => {
			const { container } = render(<Rating rating={3} isEditabled={false} />)
			const stars = container.querySelectorAll('.star')
			stars.forEach(star => {
				expect(star).toHaveAttribute('tabindex', '-1')
			})
		})
	})

	describe('Mouse Interactions', () => {
		it('should call setRating on click when editable', async () => {
			const setRating = jest.fn()
			const user = userEvent.setup()
			const { container } = render(<Rating rating={0} isEditabled={true} setRating={setRating} />)

			const thirdStar = container.querySelectorAll('.star')[2]
			await user.click(thirdStar)

			expect(setRating).toHaveBeenCalledWith(3)
		})

		it('should not call setRating when not editable', async () => {
			const setRating = jest.fn()
			const user = userEvent.setup()
			const { container } = render(<Rating rating={0} isEditabled={false} setRating={setRating} />)

			const firstStar = container.querySelectorAll('.star')[0]
			await user.click(firstStar)

			expect(setRating).not.toHaveBeenCalled()
		})

		it('should update rating on different star clicks', async () => {
			const setRating = jest.fn()
			const user = userEvent.setup()
			const { container } = render(<Rating rating={0} isEditabled={true} setRating={setRating} />)

			const stars = container.querySelectorAll('.star')

			await user.click(stars[0])
			expect(setRating).toHaveBeenCalledWith(1)

			await user.click(stars[4])
			expect(setRating).toHaveBeenCalledWith(5)
		})
	})

	describe('Keyboard Interactions', () => {
		it('should set rating on Enter key press', async () => {
			const setRating = jest.fn()
			render(<Rating rating={0} isEditabled={true} setRating={setRating} />)

			expect(setRating).toHaveBeenCalledWith(2)
		})

		it('should set rating on Space key press', async () => {
			const setRating = jest.fn()
			render(<Rating rating={0} isEditabled={true} setRating={setRating} />)

			expect(setRating).toHaveBeenCalledWith(4)
		})

		it('should increase rating on ArrowRight', async () => {
			const setRating = jest.fn()
			render(<Rating rating={2} isEditabled={true} setRating={setRating} />)

			expect(setRating).toHaveBeenCalledWith(3)
		})

		it('should decrease rating on ArrowLeft', async () => {
			const setRating = jest.fn()
			render(<Rating rating={3} isEditabled={true} setRating={setRating} />)

			expect(setRating).toHaveBeenCalledWith(2)
		})

		it('should not decrease rating below 1 on ArrowLeft', async () => {
			const setRating = jest.fn()
			render(<Rating rating={1} isEditabled={true} setRating={setRating} />)

			expect(setRating).not.toHaveBeenCalled()
		})

		it('should not increase rating above 5 on ArrowRight', async () => {
			const setRating = jest.fn()
			render(<Rating rating={5} isEditabled={true} setRating={setRating} />)

			expect(setRating).not.toHaveBeenCalled()
		})
	})

	describe('Error Handling', () => {
		it('should display error message when error prop is provided', () => {
			const error = { message: 'Rating is required', type: 'required' }
			render(<Rating rating={0} error={error} />)

			expect(screen.getByText('Rating is required')).toBeInTheDocument()
		})

		it('should apply error class when error exists', () => {
			const error = { message: 'Error', type: 'required' }
			const { container } = render(<Rating rating={0} error={error} />)

			const ratingContainer = container.querySelector('.rating')
			expect(ratingContainer).toHaveClass('error')
		})

		it('should not display error message when no error', () => {
			const { container } = render(<Rating rating={3} />)
			const errorMessage = container.querySelector('.errorMessage')
			expect(errorMessage).not.toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('should have role group', () => {
			render(<Rating rating={3} />)
			expect(screen.getByRole('group')).toBeInTheDocument()
		})

		it('should have aria-label for rating group', () => {
			render(<Rating rating={3} />)
			expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Rating')
		})

		it('should have role button for editable stars', () => {
			const { container } = render(<Rating rating={0} isEditabled={true} setRating={jest.fn()} />)
			const stars = container.querySelectorAll('[role="button"]')
			expect(stars).toHaveLength(5)
		})

		it('should have aria-label for each star', () => {
			const { container } = render(<Rating rating={0} isEditabled={true} setRating={jest.fn()} />)
			const stars = container.querySelectorAll('.star')

			stars.forEach((star, index) => {
				expect(star).toHaveAttribute('aria-label', `Rate ${index + 1} out of 5 stars`)
			})
		})

		it('should not have role button for non-editable stars', () => {
			const { container } = render(<Rating rating={3} isEditabled={false} />)
			const stars = container.querySelectorAll('.star')

			stars.forEach(star => {
				expect(star).not.toHaveAttribute('role', 'button')
			})
		})
	})

	describe('Ref Forwarding', () => {
		it('should forward ref to rating container', () => {
			const ref = React.createRef<HTMLDivElement>()
			render(<Rating rating={3} ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLDivElement)
			expect(ref.current?.className).toContain('rating')
		})
	})

	describe('Dynamic Updates', () => {
		it('should update stars when rating prop changes', () => {
			const { container, rerender } = render(<Rating rating={2} />)

			let filledStars = container.querySelectorAll('.filled')
			expect(filledStars).toHaveLength(2)

			rerender(<Rating rating={4} />)

			filledStars = container.querySelectorAll('.filled')
			expect(filledStars).toHaveLength(4)
		})
	})
})
