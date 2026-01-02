import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface LoadingSpinnerProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
}
