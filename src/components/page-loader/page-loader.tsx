import styles from './page-loader.module.css'

export const PageLoader = (): JSX.Element => {
	return (
		<div className={styles.pageLoader}>
			<div className={styles.spinner}>
				<div className={styles.doubleBounce1}></div>
				<div className={styles.doubleBounce2}></div>
			</div>
			<p className={styles.loadingText}>Yuklanmoqda...</p>
		</div>
	)
}

export default PageLoader
