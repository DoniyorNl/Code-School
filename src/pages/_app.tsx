import { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as React from 'react'

import ErrorBoundary from '../components/error-boundary/error-boundary'
import { registerServiceWorker } from '../helpers/pwa'
import '../styles/globals.css'

// Font optimization with next/font
const notoSans = Noto_Sans({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	variable: '--font-noto-sans',
})

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	// Route progress bar
	React.useEffect(() => {
		const handleRouteStart = () => NProgress.start()
		const handleRouteDone = () => NProgress.done()
		Router.events.on('routeChangeStart', handleRouteStart)
		Router.events.on('routeChangeComplete', handleRouteDone)
		Router.events.on('routeChangeError', handleRouteDone)
		return () => {
			Router.events.off('routeChangeStart', handleRouteStart)
			Router.events.off('routeChangeComplete', handleRouteDone)
			Router.events.off('routeChangeError', handleRouteDone)
		}
	}, [])

	// Register Service Worker (PWA)
	React.useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			registerServiceWorker()
		}
	}, [])

	return (
		<ErrorBoundary>
			<main className={notoSans.className}>
				<Component {...pageProps} />
			</main>
		</ErrorBoundary>
	)
}

export default MyApp
