import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../components/button/button'
import Heading from '../components/heading/heading'
import styles from '../styles/error-page.module.css'

const Custom404 = (): JSX.Element => {
	const router = useRouter()
	const [countdown, setCountdown] = useState(10)

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					router.push('/')
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [router])

	return (
		<div className={styles.errorPage}>
			<div className={styles.errorContent}>
				<div className={styles.errorCode}>404</div>
				<Heading tag='h1'>Sahifa topilmadi</Heading>
				<p className={styles.errorDescription}>
					Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
				</p>
				<p className={styles.countdown}>
					{countdown} soniyadan keyin bosh sahifaga yo'naltirilasiz...
				</p>
				<div className={styles.errorActions}>
					<Link href='/'>
						<Button appearance='primary'>Bosh sahifaga qaytish</Button>
					</Link>
					<Link href='/courses'>
						<Button appearance='ghost'>Kurslarni ko'rish</Button>
					</Link>
				</div>
			</div>
			<div className={styles.errorIllustration}>
				<svg
					width='400'
					height='300'
					viewBox='0 0 400 300'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle cx='200' cy='150' r='100' fill='#f0f0f0' />
					<path
						d='M150 130c0-11.046 8.954-20 20-20s20 8.954 20 20'
						stroke='#333'
						strokeWidth='4'
						strokeLinecap='round'
					/>
					<path
						d='M210 130c0-11.046 8.954-20 20-20s20 8.954 20 20'
						stroke='#333'
						strokeWidth='4'
						strokeLinecap='round'
					/>
					<path d='M160 180c20 20 60 20 80 0' stroke='#333' strokeWidth='4' strokeLinecap='round' />
				</svg>
			</div>
		</div>
	)
}

export default Custom404
