import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { ScrollUp } from '../components'
import { AppContextProvider, IAppContext } from '../context/app.context'
import Footer from './footer/footer'
import Header from './header/header'
import styles from './layout.module.css'
import { LayoutProps } from './layout.props'
import Sidebar from './sidebar/sidebar'

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<Sidebar className={styles.sidebar} />
				<div className={styles.body}>{children}</div>
				<Footer className={styles.footer} />
				<ScrollUp />
			</div>
		</>
	)
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>,
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		const router = useRouter()
		// If any server-side fetch produced an error, surface a visible banner so
		// operator can see the issue in the browser and check deployment logs.
		const fetchError = (props as any).fetchError as string | undefined

		const Content = (
			<>
				{fetchError && (
					<div
						style={{
							background: '#ffebeb',
							color: '#8b0000',
							padding: '12px 16px',
							textAlign: 'center',
						}}
					>
						Server data fetch error: {fetchError}. Check deployment logs and Supabase env variables.
					</div>
				)}
				<Component {...props} />
			</>
		)

		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				{router.asPath === '/' ? (
					<>
						<Header />
						{Content}
						<ScrollUp />
					</>
				) : (
					<Layout>{Content}</Layout>
				)}
			</AppContextProvider>
		)
	}
}
