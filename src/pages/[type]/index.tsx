import { GetServerSideProps } from 'next'
import { firstLevelMenu } from '../../helpers/constants'
import { logger } from '../../helpers/logger'

const Type = () => {
	return <div>Type</div>
}

export default Type

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { type } = query

	logger.log('🔍 [TYPE PAGE] Received type:', type)

	if (!type) {
		logger.log('❌ [TYPE PAGE] No type provided')
		return { notFound: true }
	}

	const firstCategoryItem = firstLevelMenu.find(m => m.route === type)

	logger.log('🔍 [TYPE PAGE] firstCategoryItem:', firstCategoryItem)

	if (!firstCategoryItem) {
		logger.log('❌ [TYPE PAGE] No matching category for:', type)
		return { notFound: true }
	}

	try {
		// Redirect to first available page with timeout
		const { supabase } = await import('../../lib/supabase')

		// Create timeout promise
		const timeoutPromise = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Query timeout')), 5000),
		)

		// Find a second_category that has pages
		const queryPromise = supabase
			.from('second_categories')
			.select('id, name')
			.eq('category_id', firstCategoryItem.id)

		const { data: secondCategories, error: scError } = (await Promise.race([
			queryPromise,
			timeoutPromise,
		])) as any

		logger.log('🔍 [TYPE PAGE] All secondCategories:', secondCategories, 'error:', scError)

		type SecondCategory = { id: number; name: string }
		type Page = { alias: string }

		if (secondCategories && secondCategories.length > 0) {
			// Try each second_category until we find one with pages
			for (const sc of secondCategories as SecondCategory[]) {
				const pagesQueryPromise = supabase
					.from('pages')
					.select('alias')
					.eq('second_category_id', sc.id)
					.limit(1)

				const { data: pages, error: pagesError } = (await Promise.race([
					pagesQueryPromise,
					timeoutPromise,
				])) as any

				logger.log(`🔍 [TYPE PAGE] Checking ${sc.name}:`, pages, 'error:', pagesError)

				if (pages && pages[0]) {
					logger.log(
						'✅ [TYPE PAGE] Found page! Redirecting to:',
						`/${type}/${(pages as Page[])[0].alias}`,
					)
					return {
						redirect: {
							destination: `/${type}/${(pages as Page[])[0].alias}`,
							permanent: false,
						},
					}
				}
			}
		}

		logger.log('❌ [TYPE PAGE] No pages found, returning 404')
		return { notFound: true }
	} catch (error) {
		logger.log('❌ [TYPE PAGE] Error or timeout:', error)
		return { notFound: true }
	}
}
