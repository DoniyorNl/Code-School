import { render } from '@/src/test-utils/test-utils'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Input from './input'

describe('Input Component', () => {
	describe('Rendering', () => {
		it('should render input element', () => {
			render(<Input />)
			expect(screen.getByRole('textbox')).toBeInTheDocument()
		})

		it('should render with placeholder', () => {
			render(<Input placeholder='Enter text' />)
			expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
		})

		it('should apply custom className to input', () => {
			render(<Input className='custom-input' />)
			expect(screen.getByRole('textbox')).toHaveClass('custom-input')
		})

		it('should render input wrapper', () => {
			const { container } = render(<Input />)
			expect(container.querySelector('.inputWrapper')).toBeInTheDocument()
		})
	})

	describe('Error Handling', () => {
		it('should display error message when error prop is provided', () => {
			const error = { message: 'This field is required', type: 'required' }
			render(<Input error={error} />)
			expect(screen.getByText('This field is required')).toBeInTheDocument()
		})

		it('should apply error class when error exists', () => {
			const error = { message: 'Error message', type: 'required' }
			render(<Input error={error} />)
			expect(screen.getByRole('textbox')).toHaveClass('error')
		})

		it('should not display error message when no error', () => {
			render(<Input />)
			expect(screen.queryByRole('alert')).not.toBeInTheDocument()
		})

		it('should have role alert for error message', () => {
			const error = { message: 'Error occurred', type: 'required' }
			render(<Input error={error} />)
			expect(screen.getByRole('alert')).toHaveTextContent('Error occurred')
		})
	})

	describe('Accessibility', () => {
		it('should have aria-invalid when error exists', () => {
			const error = { message: 'Error', type: 'required' }
			render(<Input error={error} />)
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
		})

		it('should not have aria-invalid when no error', () => {
			render(<Input />)
			expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true')
		})

		it('should connect error message with aria-describedby', () => {
			const error = { message: 'Error message', type: 'required' }
			render(<Input error={error} />)
			const input = screen.getByRole('textbox')
			const describedBy = input.getAttribute('aria-describedby')
			expect(describedBy).toBeTruthy()
			expect(screen.getByText('Error message')).toHaveAttribute('id', describedBy)
		})

		it('should have aria-label when provided', () => {
			render(<Input aria-label='Username' />)
			expect(screen.getByLabelText('Username')).toBeInTheDocument()
		})
	})

	describe('User Interactions', () => {
		it('should accept text input', async () => {
			const user = userEvent.setup()
			render(<Input />)
			const input = screen.getByRole('textbox')

			await user.type(input, 'Hello World')
			expect(input).toHaveValue('Hello World')
		})

		it('should call onChange handler', async () => {
			const handleChange = jest.fn()
			const user = userEvent.setup()
			render(<Input onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test')

			expect(handleChange).toHaveBeenCalled()
		})

		it('should be clearable', async () => {
			const user = userEvent.setup()
			render(<Input />)
			const input = screen.getByRole('textbox') as HTMLInputElement

			await user.type(input, 'test')
			expect(input.value).toBe('test')

			await user.clear(input)
			expect(input.value).toBe('')
		})

		it('should handle focus and blur', async () => {
			const handleFocus = jest.fn()
			const handleBlur = jest.fn()
			const user = userEvent.setup()

			render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
			const input = screen.getByRole('textbox')

			await user.click(input)
			expect(handleFocus).toHaveBeenCalled()

			await user.tab()
			expect(handleBlur).toHaveBeenCalled()
		})
	})

	describe('Input Types', () => {
		it('should support different input types', () => {
			const { rerender } = render(<Input type='text' />)
			expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')

			rerender(<Input type='email' />)
			expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

			rerender(<Input type='password' />)
			const passwordInput = document.querySelector('input[type="password"]')
			expect(passwordInput).toHaveAttribute('type', 'password')
		})

		it('should support number input', () => {
			render(<Input type='number' />)
			expect(screen.getByRole('spinbutton')).toBeInTheDocument()
		})
	})

	describe('Value Control', () => {
		it('should work as controlled component', async () => {
			const TestComponent = () => {
				const [value, setValue] = React.useState('')
				return <Input value={value} onChange={e => setValue(e.target.value)} />
			}

			const user = userEvent.setup()
			render(<TestComponent />)
			const input = screen.getByRole('textbox')

			await user.type(input, 'test')
			expect(input).toHaveValue('test')
		})

		it('should respect disabled state', async () => {
			const handleChange = jest.fn()
			const user = userEvent.setup()
			render(<Input disabled onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test')

			expect(input).toBeDisabled()
			expect(handleChange).not.toHaveBeenCalled()
		})

		it('should respect readOnly state', async () => {
			const handleChange = jest.fn()
			const user = userEvent.setup()
			render(<Input readOnly value='readonly text' onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test')

			expect(input).toHaveValue('readonly text')
			expect(handleChange).not.toHaveBeenCalled()
		})
	})

	describe('Ref Forwarding', () => {
		it('should forward ref to input element', () => {
			const ref = React.createRef<HTMLInputElement>()
			render(<Input ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLInputElement)
			expect(ref.current?.tagName).toBe('INPUT')
		})

		it('should allow ref to focus input', () => {
			const ref = React.createRef<HTMLInputElement>()
			render(<Input ref={ref} />)

			ref.current?.focus()
			expect(ref.current).toHaveFocus()
		})
	})
})
