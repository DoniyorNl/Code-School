import { useEffect, useState } from 'react'

/**
 * useDebounce hook - qiymatni debounce qiladi
 * Search va input field'lar uchun performance optimization
 *
 * @param value - Debounce qilinadigan qiymat
 * @param delay - Delay vaqti (ms)
 * @returns Debounced qiymat
 */
export function useDebounce<T>(value: T, delay = 300): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		// Set timeout to update debounced value
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		// Cleanup: cancel timeout if value changes
		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}
