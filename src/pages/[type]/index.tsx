import { GetServerSideProps } from 'next'
import { firstLevelMenu } from '../../helpers/constants'

const Type = () => {
	return <div>Type</div>
}

export default Type

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { type } = query

	console.log('🔍 [TYPE PAGE] Received type:', type)

	if (!type) {
		console.log('❌ [TYPE PAGE] No type provided')
		return { notFound: true }
	}

	const firstCategoryItem = firstLevelMenu.find(m => m.route === type)

	console.log('🔍 [TYPE PAGE] firstCategoryItem:', firstCategoryItem)

	if (!firstCategoryItem) {
		console.log('❌ [TYPE PAGE] No matching category for:', type)
		return { notFound: true }
	}

	// Redirect to first available page
	const { supabase } = await import('../../lib/supabase')

	// Find a second_category that has pages
	const { data: secondCategories, error: scError } = await supabase
		.from('second_categories')
		.select('id, name')
		.eq('category_id', firstCategoryItem.id)

	console.log('🔍 [TYPE PAGE] All secondCategories:', secondCategories, 'error:', scError)

	if (secondCategories && secondCategories.length > 0) {
		// Try each second_category until we find one with pages
		for (const sc of secondCategories) {
			const { data: pages, error: pagesError } = await supabase
				.from('pages')
				.select('alias')
				.eq('second_category_id', sc.id)
				.limit(1)

			console.log(`🔍 [TYPE PAGE] Checking ${sc.name}:`, pages, 'error:', pagesError)

			if (pages && pages[0]) {
				console.log('✅ [TYPE PAGE] Found page! Redirecting to:', `/${type}/${pages[0].alias}`)
				return {
					redirect: {
						destination: `/${type}/${pages[0].alias}`,
						permanent: false,
					},
				}
			}
		}
	}

	console.log('❌ [TYPE PAGE] No pages found, returning 404')
	return { notFound: true }
}
