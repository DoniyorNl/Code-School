/**
 * Service Worker Registration Utility
 * Handles PWA service worker lifecycle
 */

export const registerServiceWorker = () => {
	if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
		console.log('Service Workers not supported')
		return
	}

	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(registration => {
				console.log('✅ Service Worker registered:', registration.scope)

				// Check for updates periodically
				setInterval(
					() => {
						registration.update()
					},
					60 * 60 * 1000,
				) // Check every hour

				// Handle updates
				registration.addEventListener('updatefound', () => {
					const newWorker = registration.installing

					if (newWorker) {
						newWorker.addEventListener('statechange', () => {
							if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
								// New service worker available
								console.log('🔄 New content available, please refresh')

								// Optionally show update prompt
								if (window.confirm('Yangi versiya mavjud! Sahifani yangilaysizmi?')) {
									window.location.reload()
								}
							}
						})
					}
				})
			})
			.catch(error => {
				console.error('❌ Service Worker registration failed:', error)
			})
	})
}

export const unregisterServiceWorker = () => {
	if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
		return
	}

	navigator.serviceWorker.getRegistrations().then(registrations => {
		registrations.forEach(registration => {
			registration.unregister()
		})
	})
}

/**
 * Check if app is running as PWA
 */
export const isPWA = (): boolean => {
	if (typeof window === 'undefined') return false

	return (
		window.matchMedia('(display-mode: standalone)').matches ||
		(window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
		document.referrer.includes('android-app://')
	)
}

/**
 * Check if device is iOS
 */
export const isIOS = (): boolean => {
	if (typeof window === 'undefined') return false

	return (
		/iPad|iPhone|iPod/.test(navigator.userAgent) &&
		!(window as Window & { MSStream?: unknown }).MSStream
	)
}

/**
 * Check if device is Android
 */
export const isAndroid = (): boolean => {
	if (typeof window === 'undefined') return false

	return /Android/.test(navigator.userAgent)
}

/**
 * Check if app can be installed
 */
export const canInstallPWA = (): boolean => {
	if (typeof window === 'undefined') return false

	// Check if already installed
	if (isPWA()) return false

	// Check if beforeinstallprompt event is supported
	return 'onbeforeinstallprompt' in window
}
