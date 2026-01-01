import { ReactNode } from 'react'

export interface TimelineProps {
	children: ReactNode
	lineColor?: string
}

export interface TimelineItemProps {
	title: string
	icon: ReactNode
	children: ReactNode
}
