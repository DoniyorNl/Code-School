import { useEffect } from 'react'
import { logger } from '../helpers/logger'

/**
 * Performance monitoring hook
 * Tracks Web Vitals and logs performance metrics
 */

export interface PerformanceMetrics {
	name: string
	value: number
	rating: 'good' | 'needs-improvement' | 'poor'
	navigationType?: string
}

// Web Vitals thresholds
const THRESHOLDS = {
	FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
	LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
	FID: { good: 100, poor: 300 }, // First Input Delay
	CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
	TTFB: { good: 800, poor: 1800 }, // Time to First Byte
	INP: { good: 200, poor: 500 }, // Interaction to Next Paint
}

// Get rating based on metric
function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
	const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS]
	if (!threshold) return 'good'

	if (value <= threshold.good) return 'good'
	if (value <= threshold.poor) return 'needs-improvement'
	return 'poor'
}

// Report to analytics (optional)
function sendToAnalytics(metric: PerformanceMetrics) {
	// You can send to Google Analytics, Vercel Analytics, etc.
	logger.info(`📊 Performance: ${metric.name}`, {
		value: Math.round(metric.value),
		rating: metric.rating,
	})

	// Example: Send to Google Analytics
	// if (typeof window !== 'undefined' && window.gtag) {
	//   window.gtag('event', metric.name, {
	//     value: Math.round(metric.value),
	//     event_category: 'Web Vitals',
	//     event_label: metric.rating,
	//     non_interaction: true,
	//   })
	// }
}

/**
 * Use Web Vitals hook
 * Monitors and logs Core Web Vitals
 */
export const useWebVitals = (enabled = true) => {
	useEffect(() => {
		if (!enabled || typeof window === 'undefined') return

		// Import web-vitals dynamically (only if needed)
		const reportWebVitals = async () => {
			try {
				const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

				// Cumulative Layout Shift
				onCLS(metric => {
					const perfMetric: PerformanceMetrics = {
						name: 'CLS',
						value: metric.value,
						rating: getRating('CLS', metric.value),
						navigationType: metric.navigationType,
					}
					sendToAnalytics(perfMetric)
				})

				// First Contentful Paint
				onFCP(metric => {
					const perfMetric: PerformanceMetrics = {
						name: 'FCP',
						value: metric.value,
						rating: getRating('FCP', metric.value),
						navigationType: metric.navigationType,
					}
					sendToAnalytics(perfMetric)
				})

				// Largest Contentful Paint
				onLCP(metric => {
					const perfMetric: PerformanceMetrics = {
						name: 'LCP',
						value: metric.value,
						rating: getRating('LCP', metric.value),
						navigationType: metric.navigationType,
					}
					sendToAnalytics(perfMetric)
				})

				// Time to First Byte
				onTTFB(metric => {
					const perfMetric: PerformanceMetrics = {
						name: 'TTFB',
						value: metric.value,
						rating: getRating('TTFB', metric.value),
						navigationType: metric.navigationType,
					}
					sendToAnalytics(perfMetric)
				})

				// Interaction to Next Paint
				onINP(metric => {
					const perfMetric: PerformanceMetrics = {
						name: 'INP',
						value: metric.value,
						rating: getRating('INP', metric.value),
						navigationType: metric.navigationType,
					}
					sendToAnalytics(perfMetric)
				})
			} catch (error) {
				logger.error('Web Vitals import error:', error)
			}
		}

		reportWebVitals()
	}, [enabled])
}

/**
 * Use Performance Observer hook
 * Tracks custom performance marks and measures
 */
export const usePerformanceObserver = (enabled = true) => {
	useEffect(() => {
		if (!enabled || typeof window === 'undefined' || !('PerformanceObserver' in window)) return

		const observer = new PerformanceObserver(list => {
			for (const entry of list.getEntries()) {
				logger.info(`⏱️  ${entry.name}: ${Math.round(entry.duration)}ms`)
			}
		})

		try {
			observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] })
		} catch (error) {
			logger.error('Performance Observer error:', error)
		}

		return () => {
			observer.disconnect()
		}
	}, [enabled])
}

/**
 * Performance timing utility
 * Measure execution time of async functions
 */
export const measurePerformance = async <T>(
	name: string,
	fn: () => Promise<T>,
): Promise<{ result: T; duration: number }> => {
	const startTime = performance.now()
	const result = await fn()
	const duration = performance.now() - startTime

	logger.info(`⏱️  ${name}: ${Math.round(duration)}ms`)

	return { result, duration }
}

/**
 * Mark performance points
 */
export const performanceMark = (name: string) => {
	if (typeof window !== 'undefined' && 'performance' in window) {
		performance.mark(name)
	}
}

/**
 * Measure between two marks
 */
export const performanceMeasure = (name: string, startMark: string, endMark: string) => {
	if (typeof window !== 'undefined' && 'performance' in window) {
		try {
			performance.measure(name, startMark, endMark)
			const measure = performance.getEntriesByName(name)[0]
			logger.info(`⏱️  ${name}: ${Math.round(measure.duration)}ms`)
		} catch (error) {
			logger.error(`Performance measure error for ${name}:`, error)
		}
	}
}
