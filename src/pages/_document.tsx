import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='uz' data-scroll-behavior='smooth'>
			<Head>
				{/* DNS Prefetch for external resources */}
				<link rel='dns-prefetch' href='https://media.graphassets.com' />
				<link rel='preconnect' href='https://media.graphassets.com' />
				<link rel='dns-prefetch' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.googleapis.com' crossOrigin='anonymous' />

				{/* Load font stylesheet directly - no preload needed as Next.js optimizes fonts */}
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap'
				/>

				{/* Icons */}
				<link rel='icon' type='image/svg+xml' href='/logo.svg' />
				<link rel='apple-touch-icon' href='/logoPng.png' />

				{/* PWA Manifest */}
				<link rel='manifest' href='/manifest.json' />

				{/* Theme color for mobile browsers */}
				<meta name='theme-color' content='#7653FC' />
				<meta name='msapplication-TileColor' content='#7653FC' />

				{/* Security Headers */}
				<meta httpEquiv='X-Content-Type-Options' content='nosniff' />
				<meta httpEquiv='X-XSS-Protection' content='1; mode=block' />
				<meta name='referrer' content='strict-origin-when-cross-origin' />

				{/* iOS PWA Support */}
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='CodeSchool' />

				{/* Microsoft Tiles */}
				<meta name='msapplication-config' content='none' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
