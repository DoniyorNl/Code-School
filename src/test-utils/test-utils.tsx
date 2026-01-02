import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Add custom render function with providers if needed
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
	return render(ui, { ...options })
}

// Export everything from @testing-library/react
export * from '@testing-library/react'

// Export commonly used utilities
export { default as userEvent } from '@testing-library/user-event'

// Export custom render (overrides the default render from wildcard export)
export { customRender as render }
