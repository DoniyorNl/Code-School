import styles from './hero-illustration.module.css'

const HeroIllustration = () => {
	return (
		<div className={styles.container}>
			<svg
				className={styles.heroSvg}
				viewBox='0 0 800 600'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				{/* Background gradient circles */}
				<defs>
					<linearGradient id='gradPurple' x1='0%' y1='0%' x2='100%' y2='100%'>
						<stop offset='0%' stopColor='#7653FC' stopOpacity='0.8' />
						<stop offset='100%' stopColor='#5233CC' stopOpacity='0.6' />
					</linearGradient>
					<linearGradient id='gradOrange' x1='0%' y1='0%' x2='100%' y2='100%'>
						<stop offset='0%' stopColor='#FF6B35' stopOpacity='0.8' />
						<stop offset='100%' stopColor='#FF8C42' stopOpacity='0.6' />
					</linearGradient>
					<linearGradient id='gradBlue' x1='0%' y1='0%' x2='100%' y2='100%'>
						<stop offset='0%' stopColor='#1CC5DC' stopOpacity='0.8' />
						<stop offset='100%' stopColor='#4FD1E5' stopOpacity='0.6' />
					</linearGradient>
					<linearGradient id='gradCode' x1='0%' y1='0%' x2='100%' y2='0%'>
						<stop offset='0%' stopColor='#7653FC' />
						<stop offset='50%' stopColor='#FF6B35' />
						<stop offset='100%' stopColor='#1CC5DC' />
					</linearGradient>
				</defs>

				{/* Large background circles */}
				<circle
					cx='400'
					cy='300'
					r='280'
					fill='url(#gradPurple)'
					opacity='0.1'
					className={styles.pulse}
				/>
				<circle
					cx='400'
					cy='300'
					r='220'
					fill='url(#gradBlue)'
					opacity='0.1'
					className={styles.pulse}
					style={{ animationDelay: '0.5s' }}
				/>
				<circle
					cx='400'
					cy='300'
					r='160'
					fill='url(#gradOrange)'
					opacity='0.1'
					className={styles.pulse}
					style={{ animationDelay: '1s' }}
				/>

				{/* Main laptop/screen shape */}
				<g className={styles.laptop}>
					<rect x='200' y='150' width='400' height='280' rx='20' fill='#1e1e1e' opacity='0.95' />
					<rect x='220' y='170' width='360' height='240' rx='8' fill='#2a2a2a' />

					{/* Screen content - code lines with gradient */}
					<line
						x1='250'
						y1='200'
						x2='380'
						y2='200'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
					/>
					<line
						x1='250'
						y1='230'
						x2='450'
						y2='230'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
						style={{ animationDelay: '0.2s' }}
					/>
					<line
						x1='250'
						y1='260'
						x2='400'
						y2='260'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
						style={{ animationDelay: '0.4s' }}
					/>
					<line
						x1='250'
						y1='290'
						x2='520'
						y2='290'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
						style={{ animationDelay: '0.6s' }}
					/>
					<line
						x1='250'
						y1='320'
						x2='420'
						y2='320'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
						style={{ animationDelay: '0.8s' }}
					/>
					<line
						x1='250'
						y1='350'
						x2='480'
						y2='350'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
						style={{ animationDelay: '1s' }}
					/>
					<line
						x1='250'
						y1='380'
						x2='360'
						y2='380'
						stroke='url(#gradCode)'
						strokeWidth='8'
						strokeLinecap='round'
						className={styles.codeLine}
						style={{ animationDelay: '1.2s' }}
					/>

					{/* Laptop base */}
					<path d='M 180 430 L 620 430 L 640 460 L 160 460 Z' fill='#1e1e1e' opacity='0.9' />
				</g>

				{/* Floating icons around */}
				<g className={styles.floatIcon} style={{ animationDelay: '0s' }}>
					<circle cx='120' cy='180' r='35' fill='url(#gradPurple)' opacity='0.3' />
					<text x='120' y='192' fontSize='28' textAnchor='middle' fill='#7653FC' fontWeight='bold'>
						&lt;/&gt;
					</text>
				</g>

				<g className={styles.floatIcon} style={{ animationDelay: '0.5s' }}>
					<circle cx='680' cy='220' r='38' fill='url(#gradOrange)' opacity='0.3' />
					<text x='680' y='232' fontSize='32' textAnchor='middle' fill='#FF6B35' fontWeight='bold'>
						⚡
					</text>
				</g>

				<g className={styles.floatIcon} style={{ animationDelay: '1s' }}>
					<circle cx='140' cy='420' r='32' fill='url(#gradBlue)' opacity='0.3' />
					<text x='140' y='432' fontSize='26' textAnchor='middle' fill='#1CC5DC' fontWeight='bold'>
						💡
					</text>
				</g>

				<g className={styles.floatIcon} style={{ animationDelay: '1.5s' }}>
					<circle cx='660' cy='440' r='36' fill='url(#gradPurple)' opacity='0.3' />
					<text x='660' y='452' fontSize='30' textAnchor='middle' fill='#7653FC' fontWeight='bold'>
						🚀
					</text>
				</g>

				{/* Corner stars - 4 corners */}
				<g className={styles.star}>
					<path
						d='M 60 60 L 67 75 L 83 78 L 71 90 L 74 106 L 60 98 L 46 106 L 49 90 L 37 78 L 53 75 Z'
						fill='#FF6B35'
					/>
				</g>
				<g className={styles.star} style={{ animationDelay: '0.5s' }}>
					<path
						d='M 740 60 L 747 75 L 763 78 L 751 90 L 754 106 L 740 98 L 726 106 L 729 90 L 717 78 L 733 75 Z'
						fill='#FF6B35'
					/>
				</g>
				<g className={styles.star} style={{ animationDelay: '1s' }}>
					<path
						d='M 60 540 L 67 555 L 83 558 L 71 570 L 74 586 L 60 578 L 46 586 L 49 570 L 37 558 L 53 555 Z'
						fill='#FF6B35'
					/>
				</g>
				<g className={styles.star} style={{ animationDelay: '1.5s' }}>
					<path
						d='M 740 540 L 747 555 L 763 558 L 751 570 L 754 586 L 740 578 L 726 586 L 729 570 L 717 558 L 733 555 Z'
						fill='#FF6B35'
					/>
				</g>

				{/* Small particles */}
				<circle cx='150' cy='280' r='6' fill='#7653FC' className={styles.particle} />
				<circle
					cx='650'
					cy='320'
					r='7'
					fill='#FF6B35'
					className={styles.particle}
					style={{ animationDelay: '0.7s' }}
				/>
				<circle
					cx='180'
					cy='500'
					r='5'
					fill='#1CC5DC'
					className={styles.particle}
					style={{ animationDelay: '1.4s' }}
				/>
				<circle
					cx='620'
					cy='160'
					r='8'
					fill='#7653FC'
					className={styles.particle}
					style={{ animationDelay: '2.1s' }}
				/>
			</svg>
		</div>
	)
}

export default HeroIllustration
