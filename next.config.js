/** @type {import('next').NextConfig} */

// Bundle analyzer (optional - use ANALYZE=true npm run build)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
	reactStrictMode: false, // Hydration warning'larni kamaytirish uchun

	// Performance optimizations
	compress: true, // Enable gzip compression

	// Image optimization
	images: {
		formats: ['image/avif', 'image/webp'],
		qualities: [75, 90], // Add qualities configuration
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.graphassets.com',
			},
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	// SEO & Security Headers
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
		]
	},

	// Optimize production bundle
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	generateEtags: true,

	webpack(config, { isServer }) {
		// SVG handling
		const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

		if (!fileLoaderRule) {
			throw new Error('No existing rule for SVG files found.')
		}

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer || { and: [/\.(js|ts|jsx|tsx)$/] },
				resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
				use: ['@svgr/webpack'],
			},
		)
		fileLoaderRule.exclude = /\.svg$/i

		// Optimize bundle size
		if (!isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					chunks: 'all',
					cacheGroups: {
						default: false,
						vendors: false,
						framework: {
							name: 'framework',
							chunks: 'all',
							test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
							priority: 40,
							enforce: true,
						},
						lib: {
							test(module) {
								return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier())
							},
							name(module) {
								const hash = require('crypto').createHash('sha1')
								hash.update(module.identifier())
								return hash.digest('hex').substring(0, 8)
							},
							priority: 30,
							minChunks: 1,
							reuseExistingChunk: true,
						},
						commons: {
							name: 'commons',
							minChunks: 2,
							priority: 20,
						},
					},
				},
			}
		}

		return config
	},
}

module.exports = withBundleAnalyzer(nextConfig)
