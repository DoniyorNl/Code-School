import Head from 'next/head'
import { useRouter } from 'next/router'
import { siteConfig } from '../../config/site.config'
import { SeoProps } from './seo.props'

const Seo = (props: SeoProps) => {
	const router = useRouter()
	const {
		children,
		metaTitle = siteConfig.metaData.title,
		metaDescription = siteConfig.metaData.description,
		metaKeyword = siteConfig.metaData.keyword,
		ogImage = siteConfig.metaData.ogImage,
		ogType = 'website',
		canonicalUrl,
		noindex = false,
		nofollow = false,
		publishedTime,
		modifiedTime,
		twitterHandle = '@codeschool_uz',
		structuredData,
	} = props

	// Generate full URL for canonical and Open Graph
	const fullUrl = canonicalUrl || `${siteConfig.baseURL}${router.asPath}`
	// Remove trailing slash if exists
	const cleanUrl =
		fullUrl.endsWith('/') && fullUrl !== siteConfig.baseURL ? fullUrl.slice(0, -1) : fullUrl

	// Robots meta tag
	const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`

	return (
		<>
			<Head>
				{/* Basic Meta Tags */}
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=5' />
				<title>{metaTitle}</title>
				<meta httpEquiv='X-UA-Compatible' content='ie=edge' />
				<meta name='description' content={metaDescription} />
				<meta name='keywords' content={metaKeyword} />
				<meta name='author' content={siteConfig.metaData.author} />
				<meta name='robots' content={robotsContent} />
				<meta name='googlebot' content={robotsContent} />

				{/* Canonical URL */}
				<link rel='canonical' href={cleanUrl} />

				{/* Open Graph Meta Tags */}
				<meta property='og:type' content={ogType} />
				<meta property='og:site_name' content={siteConfig.logoText} />
				<meta property='og:title' content={metaTitle} />
				<meta property='og:description' content={metaDescription} />
				<meta property='og:url' content={cleanUrl} />
				<meta property='og:image' content={ogImage} />
				<meta property='og:image:secure_url' content={ogImage} />
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
				<meta property='og:image:alt' content={metaTitle} />
				<meta property='og:locale' content='uz_UZ' />
				<meta property='og:locale:alternate' content='ru_RU' />

				{/* Article specific meta tags */}
				{ogType === 'article' && publishedTime && (
					<meta property='article:published_time' content={publishedTime} />
				)}
				{ogType === 'article' && modifiedTime && (
					<meta property='article:modified_time' content={modifiedTime} />
				)}
				{ogType === 'article' && (
					<meta property='article:author' content={siteConfig.metaData.author} />
				)}

				{/* Twitter Card Meta Tags */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content={twitterHandle} />
				<meta name='twitter:creator' content={twitterHandle} />
				<meta name='twitter:title' content={metaTitle} />
				<meta name='twitter:description' content={metaDescription} />
				<meta name='twitter:image' content={ogImage} />
				<meta name='twitter:image:alt' content={metaTitle} />

				{/* Additional SEO Tags */}
				<meta name='format-detection' content='telephone=no' />
				<meta name='theme-color' content='#7653FC' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content={siteConfig.logoText} />

				{/* Favicon */}
				<link rel='shortcut icon' href={siteConfig.favicon} type='image/x-icon' />
				<link rel='icon' href={siteConfig.favicon} type='image/svg+xml' />
				<link rel='apple-touch-icon' href='/logoPng.png' />

				{/* Structured Data */}
				{structuredData && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
					/>
				)}
			</Head>
			<>{children}</>
		</>
	)
}

export default Seo
