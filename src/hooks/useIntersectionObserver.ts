import { useEffect, useRef } from 'react'

/**
 * useIntersectionObserver - Lazy loading uchun hook
 * Element ko'rinishga kirganini aniqlaydi
 *
 * @param callback - Element ko'rinishga kirganda chaqiriladigan funksiya
 * @param options - IntersectionObserver options
 */
export function useIntersectionObserver(callback: () => void, options?: IntersectionObserverInit) {
	const targetRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const target = targetRef.current
		if (!target) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						callback()
					}
				})
			},
			{
				root: null,
				rootMargin: '100px',
				threshold: 0.1,
				...options,
			},
		)

		observer.observe(target)

		return () => {
			if (target) {
				observer.unobserve(target)
			}
		}
	}, [callback, options])

	return targetRef
}
