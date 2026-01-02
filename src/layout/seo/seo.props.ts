import { ReactNode } from 'react'

export interface SeoProps {
	children: ReactNode
	metaTitle?: string
	metaDescription?: string
	metaKeyword?: string
	ogImage?: string
	ogType?: 'website' | 'article' | 'profile'
	canonicalUrl?: string
	noindex?: boolean
	nofollow?: boolean
	publishedTime?: string
	modifiedTime?: string
	twitterHandle?: string
	structuredData?: object
}
