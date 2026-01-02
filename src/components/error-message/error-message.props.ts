import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ErrorMessageProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string
	message?: string
	onRetry?: () => void
}
