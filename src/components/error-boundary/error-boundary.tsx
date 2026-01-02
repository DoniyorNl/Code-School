import { Component, ErrorInfo, ReactNode } from 'react'

import Button from '../button/button'
import styles from './error-boundary.module.css'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
	}

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	private handleReset = () => {
		this.setState({ hasError: false, error: null })
		window.location.reload()
	}

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className={styles.errorBoundary}>
					<div className={styles.errorContent}>
						<h1 className={styles.errorTitle}>Oops! Nimadir xato ketdi</h1>
						<p className={styles.errorMessage}>
							Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
						</p>
						{this.state.error && (
							<details className={styles.errorDetails}>
								<summary>Xato tafsilotlari</summary>
								<pre>{this.state.error.message}</pre>
							</details>
						)}
						<div className={styles.errorActions}>
							<Button appearance='primary' onClick={this.handleReset}>
								Sahifani yangilash
							</Button>
							<Button appearance='ghost' onClick={() => (window.location.href = '/')}>
								Bosh sahifaga qaytish
							</Button>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
