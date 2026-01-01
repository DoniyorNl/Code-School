import { GetServerSideProps } from 'next'
import { MenuItem } from '../interfaces/menu.interface'
import { PageCategory } from '../interfaces/page.interface'
import { withLayout } from '../layout/layout'
import Seo from '../layout/seo/seo'
import { HomePageComponent } from '../page-components'

const Index = (): JSX.Element => {
	return (
		<Seo>
			<HomePageComponent />
		</Seo>
	)
}

export default withLayout(Index)

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
	try {
		// Server-side da to'g'ridan-to'g'ri supabase'ga murojaat qilamiz
		const { supabase } = await import('../lib/supabase')

		// Get second categories with pages for category 1 (Courses)
		const { data: secondCategories, error: catError } = await supabase
			.from('second_categories')
			.select('id, name')
			.eq('category_id', 1)

		if (catError) throw catError

		// Get pages for each second category
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
		console.error('Index page SSR error:', error)
		// Return empty menu on error
		return {
			props: {
				menu: [],
				firstCategory: PageCategory.Courses,
			},
		}
	}
}

//
interface HomePageProps {
	menu: MenuItem[]
	firstCategory: PageCategory
}
