import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { IconButton, Search, Text } from '../../components'
import { firstLevelMenu, navLinks } from '../../helpers/constants'
import Logo from '../logo.svg'
import styles from './navbar.module.css'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

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

	const toggleOpen = () => setIsOpen(prev => !prev)

	return (
		<div className={styles.navbar}>
			<nav className={styles.nav} aria-label='Main navigation'>
				<Link href={'/'} aria-label='Go to homepage'>
					<Logo className={styles.logo} aria-label='Company logo' />
				</Link>
				<div className={styles.navigation}>
					{navLinks.map((nav, idx) => (
						<Link href={nav.route} key={idx}>
							<Text style={{ color: 'white' }}>{nav.name}</Text>
						</Link>
					))}
					{firstLevelMenu.map((menu, idx) => (
						<Link href={`/${menu.route}`} key={`menu-${idx}`}>
							<Text style={{ color: 'white' }}>{menu.name}</Text>
						</Link>
					))}
					<Search />
				</div>
				<IconButton
					onClick={toggleOpen}
					icon={isOpen ? 'close' : 'menu'}
					appearance='white'
					className={styles.mobileIcon}
					aria-label={isOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isOpen}
				/>
				<motion.div
					variants={variants}
					initial={'closed'}
					animate={isOpen ? 'opened' : 'closed'}
					className={styles.mobileMenu}
				>
					{navLinks.map((nav, idx) => (
						<Link href={nav.route} key={idx} className={styles.navLink}>
							<Text className={styles.navTitle}>{nav.name}</Text>
						</Link>
					))}
					{firstLevelMenu.map((menu, idx) => (
						<Link href={`/${menu.route}`} key={`menu-${idx}`} className={styles.navLink}>
							<Text className={styles.navTitle}>{menu.name}</Text>
						</Link>
					))}
					{/* <Search className={styles.search} /> */}
				</motion.div>
			</nav>
		</div>
	)
}

export default Navbar
