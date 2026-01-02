import { render } from '@/src/test-utils/test-utils'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import Button from './button'

describe('Button Component', () => {
	describe('Rendering', () => {
		it('should render button with children', () => {
			render(<Button appearance='primary'>Click me</Button>)
			expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
		})

		it('should apply primary appearance class', () => {
			render(<Button appearance='primary'>Primary</Button>)
			const button = screen.getByRole('button')
			expect(button).toHaveClass('primary')
		})

		it('should apply ghost appearance class', () => {
			render(<Button appearance='ghost'>Ghost</Button>)
			const button = screen.getByRole('button')
			expect(button).toHaveClass('ghost')
		})

		it('should apply custom className', () => {
			render(
				<Button appearance='primary' className='custom-class'>
					Test
				</Button>,
			)
			const button = screen.getByRole('button')
			expect(button).toHaveClass('custom-class')
		})
	})

	describe('Arrow Icon', () => {
		it('should not render arrow when arrow prop is none', () => {
			const { container } = render(
				<Button appearance='primary' arrow='none'>
					No Arrow
				</Button>,
			)
			expect(container.querySelector('.arrow')).not.toBeInTheDocument()
		})

		it('should render right arrow', () => {
			const { container } = render(
				<Button appearance='primary' arrow='right'>
					Right Arrow
				</Button>,
			)
			const arrow = container.querySelector('.arrow')
			expect(arrow).toBeInTheDocument()
			expect(arrow).not.toHaveClass('down')
		})

		it('should render down arrow with correct class', () => {
			const { container } = render(
				<Button appearance='primary' arrow='down'>
					Down Arrow
				</Button>,
			)
			const arrow = container.querySelector('.arrow')
			expect(arrow).toBeInTheDocument()
			expect(arrow).toHaveClass('down')
		})
	})

	describe('Interactions', () => {
		it('should call onClick handler when clicked', async () => {
			const handleClick = jest.fn()
			const user = userEvent.setup()

			render(
				<Button appearance='primary' onClick={handleClick}>
					Click me
				</Button>,
			)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleClick).toHaveBeenCalledTimes(1)
		})

		it('should not call onClick when disabled', async () => {
			const handleClick = jest.fn()
			const user = userEvent.setup()

			render(
				<Button appearance='primary' onClick={handleClick} disabled>
					Disabled
				</Button>,
			)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleClick).not.toHaveBeenCalled()
		})

		it('should be keyboard accessible', async () => {
			const handleClick = jest.fn()
			const user = userEvent.setup()

			render(
				<Button appearance='primary' onClick={handleClick}>
					Press Enter
				</Button>,
			)

			const button = screen.getByRole('button')
			button.focus()
			await user.keyboard('{Enter}')

			expect(handleClick).toHaveBeenCalled()
		})
	})

	describe('Accessibility', () => {
		it('should have correct button role', () => {
			render(<Button appearance='primary'>Accessible</Button>)
			expect(screen.getByRole('button')).toBeInTheDocument()
		})

		it('should be focusable', () => {
			render(<Button appearance='primary'>Focusable</Button>)
			const button = screen.getByRole('button')
			button.focus()
			expect(button).toHaveFocus()
		})

		it('should pass through aria attributes', () => {
			render(
				<Button appearance='primary' aria-label='Custom label' aria-busy={true}>
					Button
				</Button>,
			)
			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('aria-label', 'Custom label')
			expect(button).toHaveAttribute('aria-busy', 'true')
		})

		it('should indicate disabled state', () => {
			render(
				<Button appearance='primary' disabled>
					Disabled
				</Button>,
			)
			expect(screen.getByRole('button')).toBeDisabled()
		})
	})

	describe('HTML Attributes', () => {
		it('should pass through type attribute', () => {
			render(
				<Button appearance='primary' type='submit'>
					Submit
				</Button>,
			)
			expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
		})

		it('should accept and use data attributes', () => {
			render(
				<Button appearance='primary' data-testid='custom-test-id'>
					Data Attr
				</Button>,
			)
			expect(screen.getByTestId('custom-test-id')).toBeInTheDocument()
		})
	})
})
