import Link from 'next/link'
import Button from '../components/button/button'
import Heading from '../components/heading/heading'
import styles from '../styles/error-page.module.css'

const Custom500 = (): JSX.Element => {
	const handleReload = () => {
		window.location.reload()
	}

	return (
		<div className={styles.errorPage}>
			<div className={styles.errorContent}>
				<div className={styles.errorCode}>500</div>
				<Heading tag='h1'>Server xatosi</Heading>
				<p className={styles.errorDescription}>
					Kechirasiz, serverda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.
				</p>
				<div className={styles.errorActions}>
					<Button appearance='primary' onClick={handleReload}>
						Sahifani yangilash
					</Button>
					<Link href='/'>
						<Button appearance='ghost'>Bosh sahifaga qaytish</Button>
					</Link>
				</div>
				<div className={styles.errorDetails}>
					<p>Agar muammo davom etsa:</p>
					<ul>
						<li>Brauzer keshini tozalang</li>
						<li>Internet aloqangizni tekshiring</li>
						<li>Qo'llab-quvvatlash xizmatiga murojaat qiling</li>
					</ul>
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
					<circle cx='200' cy='150' r='100' fill='#ffebee' />
					<path
						d='M150 130c0-11.046 8.954-20 20-20s20 8.954 20 20'
						stroke='#d32f2f'
						strokeWidth='4'
						strokeLinecap='round'
					/>
					<path
						d='M210 130c0-11.046 8.954-20 20-20s20 8.954 20 20'
						stroke='#d32f2f'
						strokeWidth='4'
						strokeLinecap='round'
					/>
					<circle cx='170' cy='140' r='5' fill='#d32f2f' />
					<circle cx='230' cy='140' r='5' fill='#d32f2f' />
					<path
						d='M160 190c20-15 60-15 80 0'
						stroke='#d32f2f'
						strokeWidth='4'
						strokeLinecap='round'
					/>
				</svg>
			</div>
		</div>
	)
}

export default Custom500
