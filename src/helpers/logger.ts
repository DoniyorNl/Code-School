/**
 * Logger utility - only logs in development mode
 * Production da console.log lar ko'rinmaydi
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
	// General debug logs only in development
	log: (...args: unknown[]) => {
		if (isDevelopment) {
			console.log(...args)
		}
	},
	// Always emit errors so production logs capture issues (Vercel console)
	error: (...args: unknown[]) => {
		console.error(...args)
	},
	// Warnings visible in development; also print in production for visibility
	warn: (...args: unknown[]) => {
		if (isDevelopment) {
			console.warn(...args)
		} else {
			console.warn(...args)
		}
	},
	// Informational messages only in development
	info: (...args: unknown[]) => {
		if (isDevelopment) {
			console.info(...args)
		}
	},
}
