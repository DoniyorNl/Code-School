import { siteConfig } from '../config/site.config'

/**
 * Structured Data (JSON-LD) generators for better SEO
 * Learn more: https://schema.org/
 */

// Organization Schema
export const getOrganizationSchema = () => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: siteConfig.logoText,
		url: siteConfig.baseURL,
		logo: `${siteConfig.baseURL}${siteConfig.logo}`,
		description: siteConfig.metaData.description,
		sameAs: [
			// Add your social media links here
			// 'https://facebook.com/codeschool',
			// 'https://twitter.com/codeschool_uz',
			// 'https://instagram.com/codeschool_uz',
			// 'https://t.me/codeschool_uz',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Service',
			availableLanguage: ['uz', 'ru'],
		},
	}
}

// Website Schema
export const getWebsiteSchema = () => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteConfig.logoText,
		url: siteConfig.baseURL,
		description: siteConfig.metaData.description,
		inLanguage: 'uz',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteConfig.baseURL}search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	}
}

// Course Schema
export const getCourseSchema = (course: {
	name: string
	description: string
	image?: string
	provider?: string
	url?: string
}) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: course.name,
		description: course.description,
		provider: {
			'@type': 'Organization',
			name: course.provider || siteConfig.logoText,
			sameAs: siteConfig.baseURL,
		},
		image: course.image,
		url: course.url,
		inLanguage: 'uz',
		educationalLevel: 'Beginner to Advanced',
		coursePrerequisites: 'Basic computer knowledge',
	}
}

// Article/Blog Schema
export const getArticleSchema = (article: {
	title: string
	description: string
	image?: string
	datePublished?: string
	dateModified?: string
	author?: string
	url?: string
}) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.description,
		image: article.image,
		datePublished: article.datePublished,
		dateModified: article.dateModified || article.datePublished,
		author: {
			'@type': 'Person',
			name: article.author || siteConfig.metaData.author,
		},
		publisher: {
			'@type': 'Organization',
			name: siteConfig.logoText,
			logo: {
				'@type': 'ImageObject',
				url: `${siteConfig.baseURL}${siteConfig.logo}`,
			},
		},
		url: article.url,
		inLanguage: 'uz',
	}
}

// BreadcrumbList Schema
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	}
}

// FAQ Schema
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(faq => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
	}
}

// Product Schema (for course products)
export const getProductSchema = (product: {
	name: string
	description: string
	image?: string
	price?: number
	currency?: string
	availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
	url?: string
	rating?: { value: number; count: number }
}) => {
	const schema: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: product.image,
		url: product.url,
	}

	// Add offers if price is provided
	if (product.price !== undefined) {
		schema.offers = {
			'@type': 'Offer',
			price: product.price,
			priceCurrency: product.currency || 'UZS',
			availability: `https://schema.org/${product.availability || 'InStock'}`,
			url: product.url,
		}
	}

	// Add aggregate rating if provided
	if (product.rating) {
		schema.aggregateRating = {
			'@type': 'AggregateRating',
			ratingValue: product.rating.value,
			reviewCount: product.rating.count,
			bestRating: 5,
			worstRating: 1,
		}
	}

	return schema
}

// Educational Organization Schema
export const getEducationalOrganizationSchema = () => {
	return {
		'@context': 'https://schema.org',
		'@type': 'EducationalOrganization',
		name: siteConfig.logoText,
		url: siteConfig.baseURL,
		logo: `${siteConfig.baseURL}${siteConfig.logo}`,
		description: siteConfig.metaData.description,
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'UZ',
		},
		sameAs: [
			// Add your social media links here
		],
	}
}
