import { useEffect, useState } from 'react'
import { canInstallPWA, isAndroid, isIOS, isPWA } from '../helpers/pwa'

/**
 * Hook to detect if app is running as PWA
 */
export const useIsPWA = (): boolean => {
	const [pwa, setPwa] = useState(false)

	useEffect(() => {
		setPwa(isPWA())
	}, [])

	return pwa
}

/**
 * Hook to detect if app can be installed
 */
export const useCanInstall = (): boolean => {
	const [canInstall, setCanInstall] = useState(false)

	useEffect(() => {
		setCanInstall(canInstallPWA())
	}, [])

	return canInstall
}

/**
 * Hook to detect device type
 */
export const useDeviceType = () => {
	const [device, setDevice] = useState({
		isIOS: false,
		isAndroid: false,
		isMobile: false,
	})

	useEffect(() => {
		const ios = isIOS()
		const android = isAndroid()

		setDevice({
			isIOS: ios,
			isAndroid: android,
			isMobile: ios || android,
		})
	}, [])

	return device
}

/**
 * Hook to detect online/offline status
 */
export const useOnlineStatus = (): boolean => {
	const [isOnline, setIsOnline] = useState(true)

	useEffect(() => {
		setIsOnline(navigator.onLine)

		const handleOnline = () => setIsOnline(true)
		const handleOffline = () => setIsOnline(false)

		window.addEventListener('online', handleOnline)
		window.addEventListener('offline', handleOffline)

		return () => {
			window.removeEventListener('online', handleOnline)
			window.removeEventListener('offline', handleOffline)
		}
	}, [])

	return isOnline
}

/**
 * Hook to show update notification when new service worker is available
 */
export const useServiceWorkerUpdate = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false)
	const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
			return
		}

		navigator.serviceWorker.getRegistration().then(reg => {
			if (!reg) return

			setRegistration(reg)

			// Check for updates
			reg.addEventListener('updatefound', () => {
				const newWorker = reg.installing

				if (newWorker) {
					newWorker.addEventListener('statechange', () => {
						if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
							setUpdateAvailable(true)
						}
					})
				}
			})
		})
	}, [])

	const updateServiceWorker = () => {
		if (registration && registration.waiting) {
			registration.waiting.postMessage({ type: 'SKIP_WAITING' })
			window.location.reload()
		}
	}

	return { updateAvailable, updateServiceWorker }
}

/**
 * Hook to detect app install
 */
export const useAppInstalled = () => {
	const [installed, setInstalled] = useState(false)

	useEffect(() => {
		const handleInstalled = () => {
			setInstalled(true)
			console.log('✅ App installed successfully')
		}

		window.addEventListener('appinstalled', handleInstalled)

		return () => {
			window.removeEventListener('appinstalled', handleInstalled)
		}
	}, [])

	return installed
}

/**
 * Hook for network information (experimental)
 */
export const useNetworkInfo = () => {
	const [networkInfo, setNetworkInfo] = useState({
		effectiveType: '4g',
		downlink: 10,
		rtt: 50,
		saveData: false,
	})

	useEffect(() => {
		if (!('connection' in navigator)) {
			return
		}

		type NetworkConnection = {
			effectiveType?: string
			downlink?: number
			rtt?: number
			saveData?: boolean
			addEventListener?: (type: string, listener: () => void) => void
			removeEventListener?: (type: string, listener: () => void) => void
		}

		const connection = (navigator as Navigator & { connection?: NetworkConnection }).connection

		if (!connection) {
			return
		}

		const updateNetworkInfo = () => {
			setNetworkInfo({
				effectiveType: connection.effectiveType || '4g',
				downlink: connection.downlink || 10,
				rtt: connection.rtt || 50,
				saveData: connection.saveData || false,
			})
		}

		updateNetworkInfo()

		if (connection.addEventListener) {
			connection.addEventListener('change', updateNetworkInfo)
		}

		return () => {
			if (connection.removeEventListener) {
				connection.removeEventListener('change', updateNetworkInfo)
			}
		}
	}, [])

	return networkInfo
}
