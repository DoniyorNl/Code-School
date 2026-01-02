import { FC, useEffect, useState } from 'react'
import styles from './install-prompt.module.css'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const InstallPrompt: FC = () => {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [showPrompt, setShowPrompt] = useState(false)

	useEffect(() => {
		// Check if already installed
		if (window.matchMedia('(display-mode: standalone)').matches) {
			return
		}

		// Listen for beforeinstallprompt event
		const handler = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)

			// Show prompt after a delay (better UX)
			setTimeout(() => {
				setShowPrompt(true)
			}, 3000)
		}

		window.addEventListener('beforeinstallprompt', handler)

		return () => {
			window.removeEventListener('beforeinstallprompt', handler)
		}
	}, [])

	const handleInstall = async () => {
		if (!deferredPrompt) return

		// Show install prompt
		deferredPrompt.prompt()

		// Wait for user choice
		const { outcome } = await deferredPrompt.userChoice

		if (outcome === 'accepted') {
			console.log('✅ PWA installed')
		} else {
			console.log('❌ PWA installation declined')
		}

		// Clear the prompt
		setDeferredPrompt(null)
		setShowPrompt(false)
	}

	const handleDismiss = () => {
		setShowPrompt(false)

		// Store dismissal in localStorage (don't show again for 7 days)
		localStorage.setItem('pwa-install-dismissed', Date.now().toString())
	}

	// Check if user dismissed recently
	useEffect(() => {
		const dismissed = localStorage.getItem('pwa-install-dismissed')
		if (dismissed) {
			const dismissedTime = parseInt(dismissed)
			const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)

			if (daysSinceDismissed < 7) {
				setShowPrompt(false)
				return
			}
		}
	}, [])

	if (!showPrompt || !deferredPrompt) {
		return null
	}

	return (
		<div className={styles.installPrompt}>
			<div className={styles.promptContent}>
				<button className={styles.closeButton} onClick={handleDismiss} aria-label='Yopish'>
					×
				</button>

				<div className={styles.promptIcon}>
					<svg width='48' height='48' viewBox='0 0 24 24' fill='currentColor'>
						<path d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' />
					</svg>
				</div>

				<div className={styles.promptText}>
					<h3>Ilovani o'rnating</h3>
					<p>
						CodeSchool ilovasini telefoningizga o'rnating va tezroq kirish imkoniyatiga ega bo'ling!
					</p>
				</div>

				<div className={styles.promptActions}>
					<button className={styles.installButton} onClick={handleInstall}>
						O'rnatish
					</button>
					<button className={styles.dismissButton} onClick={handleDismiss}>
						Keyinroq
					</button>
				</div>
			</div>
		</div>
	)
}

export default InstallPrompt
