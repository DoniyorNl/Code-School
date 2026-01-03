import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { IconButton } from '../../components'
import { firstLevelMenu, navLinks } from '../../helpers/constants'
import LogoIcon from '../logo.svg'
import Sidebar from '../sidebar/sidebar'
import styles from './header.module.css'
import { HeaderProps } from './header.props'

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 30,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 30,
			},
		},
	}

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Link href='/' aria-label='Home page' className={styles.logo}>
				<LogoIcon />
			</Link>

			{/* Desktop Navigation */}
			<nav className={styles.desktopNav}>
				{navLinks.map(link => (
					<Link key={link.route} href={link.route} className={styles.navLink}>
						{link.name}
					</Link>
				))}
				{firstLevelMenu.map(item => (
					<Link key={item.route} href={`/${item.route}`} className={styles.navLink}>
						{item.name}
					</Link>
				))}
			</nav>

			<div className={styles.headerActions}>
				<IconButton
					icon='menu'
					appearance='white'
					onClick={toggleMenu}
					aria-label='Menyuni ochish'
					className={styles.mobileMenuButton}
				/>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						variants={variants}
						initial='closed'
						animate='opened'
						exit='closed'
						className={styles.mobileMenu}
						role='dialog'
						aria-modal='true'
						aria-label='Mobil menyu'
					>
						<Sidebar />
						<IconButton
							className={styles.closeIcon}
							onClick={toggleMenu}
							icon='close'
							appearance='white'
							aria-label='Menyuni yopish'
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}

export default Header
