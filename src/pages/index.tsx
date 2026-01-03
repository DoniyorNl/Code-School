import { logger } from '../helpers/logger'
import { safeGetServerSideProps } from '../helpers/ssr'
import { getOrganizationSchema, getWebsiteSchema } from '../helpers/structured-data'
import { MenuItem } from '../interfaces/menu.interface'
import { PageCategory } from '../interfaces/page.interface'
import { withLayout } from '../layout/layout'
import Seo from '../layout/seo/seo'
import { HomePageComponent } from '../page-components'

//
const Index = (): JSX.Element => {
	// Combine multiple schemas into one array
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [getOrganizationSchema(), getWebsiteSchema()],
	}

	return (
		<Seo structuredData={structuredData}>
			<HomePageComponent />
		</Seo>
	)
}

export default withLayout(Index)

export const getServerSideProps = safeGetServerSideProps(async () => {
	try {
		const { supabase } = await import('../lib/supabase')

		const { data: secondCategories, error: catError } = await supabase
			.from('second_categories')
			.select('id, name')
			.eq('category_id', 1)

		if (catError) throw catError

		const menu: MenuItem[] = await Promise.all(
			((secondCategories || []) as Array<{ id: string; name: string }>).map(async secondCat => {
				const { data: pages, error: pagesError } = await supabase
					.from('pages')
					.select('id, alias, title, category')
					.eq('second_category_id', secondCat.id)

				if (pagesError) throw pagesError

				return {
					_id: {
						secondCategory: secondCat.name,
					},
					pages: (
						(pages || []) as Array<{ id: string; alias: string; title: string; category: string }>
					).map(p => ({
						alias: p.alias,
						title: p.title,
						_id: p.id,
						category: p.category,
					})),
				}
			}),
		)

		return {
			props: {
				menu,
				firstCategory: PageCategory.Courses,
			},
		}
	} catch (error) {
		logger.error('Index page SSR error:', error)
		return {
			props: {
				menu: [],
				firstCategory: PageCategory.Courses,
				fetchError: error instanceof Error ? error.message : String(error),
			},
		}
	}
})

//
interface HomePageProps {
	menu: MenuItem[]
	firstCategory: PageCategory
}
