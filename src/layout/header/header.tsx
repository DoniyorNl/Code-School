import cn from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconButton } from '../../components'
import DownloadIcon from '../../helpers/icons/download.svg'
import LogoIcon from '../logo.svg'
import Sidebar from '../sidebar/sidebar'
import styles from './header.module.css'
import { HeaderProps } from './header.props'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [canInstall, setCanInstall] = useState(false)

	const toggleMenu = () => setIsOpen(prev => !prev)

	// PWA install handler
	useEffect(() => {
		// Check if already installed
		if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
			return
		}

		const handler = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setCanInstall(true)
		}

		window.addEventListener('beforeinstallprompt', handler)

		return () => {
			window.removeEventListener('beforeinstallprompt', handler)
		}
	}, [])

	const handleInstall = async () => {
		if (!deferredPrompt) return

		deferredPrompt.prompt()

		const { outcome } = await deferredPrompt.userChoice

		if (outcome === 'accepted') {
			console.log('✅ PWA installed')
		}

		setDeferredPrompt(null)
		setCanInstall(false)
	}
	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffnes: 20,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
		},
	}
	return (
		<div className={cn(className, styles.header)} {...props}>
			<Link href={'/'}>
				<LogoIcon />
			</Link>
			<div className={styles.headerActions}>
				{canInstall && (
					<button
						onClick={handleInstall}
						className={styles.installButton}
						title="Ilovani o'rnatish"
						aria-label="PWA ilovani o'rnatish"
					>
						<DownloadIcon />
						<span>O'rnatish</span>
					</button>
				)}
				<IconButton icon='menu' appearance='white' onClick={toggleMenu} />
			</div>
			<motion.div
				variants={variants}
				initial={'closed'}
				animate={isOpen ? 'opened' : 'closed'}
				className={styles.mobileMenu}
			>
				<Sidebar />
				<IconButton
					className={styles.closeIcon}
					onClick={toggleMenu}
					icon={'close'}
					appearance={'white'}
				/>
			</motion.div>
		</div>
	)
}

export default Header
