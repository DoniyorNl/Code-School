import { AppContext } from '@/src/context/app.context'
import { render } from '@/src/test-utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './search'

const mockMenu = [
	{
		_id: { secondCategory: 'Programming' },
		isOpened: false,
		pages: [
			{ _id: '1', title: 'React Course', alias: 'react-course', category: 'courses' },
			{ _id: '2', title: 'Next.js Fundamentals', alias: 'nextjs', category: 'courses' },
			{ _id: '3', title: 'TypeScript Basics', alias: 'typescript', category: 'courses' },
		],
	},
	{
		_id: { secondCategory: 'Design' },
		isOpened: false,
		pages: [
			{ _id: '4', title: 'UI/UX Design', alias: 'ui-ux', category: 'courses' },
			{ _id: '5', title: 'Figma Master', alias: 'figma', category: 'courses' },
		],
	},
]

const mockPush = jest.fn()

jest.mock('next/router', () => ({
	useRouter: () => ({
		push: mockPush,
		query: { type: 'courses' },
		asPath: '/courses',
	}),
}))

const renderWithContext = (component: React.ReactElement) => {
	return render(
		<AppContext.Provider
			value={{
				menu: mockMenu,
				firstCategory: 1,
				setMenu: jest.fn(),
			}}
		>
			{component}
		</AppContext.Provider>,
	)
}

describe('Search Component', () => {
	beforeEach(() => {
		mockPush.mockClear()
	})

	describe('Rendering', () => {
		it('should render search input', () => {
			renderWithContext(<Search />)
			expect(screen.getByRole('textbox')).toBeInTheDocument()
		})

		it('should render with placeholder', () => {
			renderWithContext(<Search />)
			expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
		})

		it('should render search button', () => {
			renderWithContext(<Search />)
			const buttons = screen.getAllByRole('button')
			expect(buttons.length).toBeGreaterThan(0)
		})

		it('should not show results initially', () => {
			renderWithContext(<Search />)
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
		})
	})

	describe('Search Functionality', () => {
		it('should filter results based on search input', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})
		})

		it('should show multiple matching results', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'i')

			await waitFor(() => {
				expect(screen.getByText('UI/UX Design')).toBeInTheDocument()
				expect(screen.getByText('Figma Master')).toBeInTheDocument()
			})
		})

		it('should be case insensitive', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'react')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})
		})

		it('should clear results when input is empty', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})

			await user.clear(input)

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})

		it('should show no results when search does not match', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'XYZ Non Existent')

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})
	})

	describe('Navigation', () => {
		it('should navigate on result click', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})

			await user.click(screen.getByText('React Course'))

			expect(mockPush).toHaveBeenCalledWith('/courses/react-course')
		})

		it('should clear search after navigation', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox') as HTMLInputElement
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})

			await user.click(screen.getByText('React Course'))

			await waitFor(() => {
				expect(input.value).toBe('')
			})
		})
	})

	describe('Keyboard Navigation', () => {
		it('should handle ArrowDown to select next item', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'e')

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')

			const selectedOption = screen.getAllByRole('option')[0]
			expect(selectedOption).toHaveAttribute('aria-selected', 'true')
		})

		it('should handle ArrowUp to select previous item', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'e')

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')
			await user.keyboard('{ArrowDown}')
			await user.keyboard('{ArrowUp}')

			const selectedOption = screen.getAllByRole('option')[0]
			expect(selectedOption).toHaveAttribute('aria-selected', 'true')
		})

		it('should navigate on Enter when item is selected', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')
			await user.keyboard('{Enter}')

			expect(mockPush).toHaveBeenCalledWith('/courses/react-course')
		})

		it('should close results on Escape key', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByText('React Course')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})
	})

	describe('Accessibility', () => {
		it('should have aria-label for search input', () => {
			renderWithContext(<Search />)
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Search')
		})

		it('should have aria-autocomplete attribute', () => {
			renderWithContext(<Search />)
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-autocomplete', 'list')
		})

		it('should set aria-expanded when results are shown', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-expanded', 'false')

			await user.type(input, 'React')

			await waitFor(() => {
				expect(input).toHaveAttribute('aria-expanded', 'true')
			})
		})

		it('should connect input with results using aria-controls', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(input).toHaveAttribute('aria-controls', 'search-results')
				expect(screen.getByRole('listbox')).toHaveAttribute('id', 'search-results')
			})
		})

		it('should have role listbox for results container', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'React')

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('should have role option for each result', async () => {
			const user = userEvent.setup()
			renderWithContext(<Search />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'e')

			await waitFor(() => {
				const options = screen.getAllByRole('option')
				expect(options.length).toBeGreaterThan(0)
			})
		})

		it('should have aria-label on search button', () => {
			renderWithContext(<Search />)
			const searchButton = screen.getByLabelText('Search button')
			expect(searchButton).toBeInTheDocument()
		})
	})

	describe('Custom Props', () => {
		it('should accept and apply custom className', () => {
			const { container } = renderWithContext(<Search className='custom-search' />)
			const searchContainer = container.querySelector('.search')
			expect(searchContainer).toHaveClass('custom-search')
		})

		it('should pass through other props', () => {
			renderWithContext(<Search data-testid='search-component' />)
			expect(screen.getByTestId('search-component')).toBeInTheDocument()
		})
	})
})
