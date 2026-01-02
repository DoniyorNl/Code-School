import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../styles/error-page.module.css'

const Offline: FC = () => {
	return (
		<>
			<Head>
				<title>Offline - CodeSchool</title>
				<meta name='robots' content='noindex, nofollow' />
			</Head>
			<div className={styles.errorPage}>
				<div className={styles.errorContent}>
					<div className={styles.errorIcon}>
						<svg
							width='120'
							height='120'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='1' y1='1' x2='23' y2='23' />
							<path d='M16.72 11.06A10.94 10.94 0 0 1 19 12.55' />
							<path d='M5 12.55a10.94 10.94 0 0 1 5.17-2.39' />
							<path d='M10.71 5.05A16 16 0 0 1 22.58 9' />
							<path d='M1.42 9a15.91 15.91 0 0 1 4.7-2.88' />
							<path d='M8.53 16.11a6 6 0 0 1 6.95 0' />
							<line x1='12' y1='20' x2='12.01' y2='20' />
						</svg>
					</div>

					<h1 className={styles.errorTitle}>Internetga ulanish yoq</h1>
					<p className={styles.errorDescription}>
						Afsuski, internet aloqasi yoq. Iltimos, internet ulanishingizni tekshirib, qayta urinib
						koring.
					</p>

					<div className={styles.errorTips}>
						<h3>Nimalar tekshirish kerak:</h3>
						<ul>
							<li>WiFi yoki mobil internet yoqilganligini tekshiring</li>
							<li>Parvoz rejimi ochirilganligini tasdiqlang</li>
							<li>Router ulanganligini tekshiring</li>
							<li>Sahifani yangilashga harakat qiling</li>
						</ul>
					</div>

					<div className={styles.errorActions}>
						<button className={styles.primaryButton} onClick={() => window.location.reload()}>
							<span className={styles.buttonIcon}>Qayta urinish</span>
						</button>
						<Link href='/' className={styles.secondaryButton}>
							<span className={styles.buttonIcon}>Bosh sahifa</span>
						</Link>
					</div>

					<div className={styles.errorNote}>
						<p>
							<strong>Maslahat:</strong> Bazi sahifalar keshlangan bolishi mumkin va offline rejimda
							ishlashi mumkin.
						</p>
					</div>
				</div>

				<div className={styles.backgroundAnimation}>
					<div className={styles.circle}></div>
					<div className={styles.circle}></div>
					<div className={styles.circle}></div>
				</div>
			</div>
		</>
	)
}

export default Offline
