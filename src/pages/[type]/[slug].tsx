import Seo from '@/src/layout/seo/seo'
import { CoursePageComponent } from '@/src/page-components'
import { GetServerSideProps } from 'next'
import { firstLevelMenu } from '../../helpers/constants'
import { MenuItem } from '../../interfaces/menu.interface'
import { PageModel } from '../../interfaces/page.interface'
import { ProductModel } from '../../interfaces/product.interface'
import { withLayout } from '../../layout/layout'

const Index = ({ products, firstCategory, page }: PageProps) => {
	return (
		<Seo
			metaTitle={page.title}
			metaDescription={page.description}
			metaKeyword={page.tags.toString()}
		>
			<CoursePageComponent products={products} firstCategory={firstCategory} page={page} />
		</Seo>
	)
}

export default withLayout(Index)

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query }) => {
	const { slug, type } = query

	if (!slug) {
		return { notFound: true }
	}

	try {
		const { supabase } = await import('../../lib/supabase')
		const firstCategoryItem = firstLevelMenu.find(c => c.route === type) ?? { id: 0 }

		// Get menu (second categories with pages)
		const { data: secondCategories } = await supabase
			.from('second_categories')
			.select('id, name')
			.eq('category_id', firstCategoryItem.id)

		const menu: MenuItem[] = await Promise.all(
			((secondCategories || []) as Array<{ id: string; name: string }>).map(async secondCat => {
				const { data: pages } = await supabase
					.from('pages')
					.select('id, alias, title, category')
					.eq('second_category_id', secondCat.id)

				return {
					_id: { secondCategory: secondCat.name },
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

		// Get page by slug (alias)
		const { data: pageData, error: pageError } = await supabase
			.from('pages')
			.select('*, second_categories!inner(category_id)')
			.eq('alias', slug)
			.single()

		if (pageError || !pageData) {
			return { notFound: true }
		}

		type PageData = {
			id: string
			alias: string
			title: string
			tags: string[]
			description: string
			category: string
			hh_count: number
			hh_junior_salary: number
			hh_middle_salary: number
			hh_senior_salary: number
			second_categories: { category_id: number }
		}
		const typedPageData = pageData as PageData

		// Verify page belongs to correct category
		const pageSecondCategory = typedPageData.second_categories
		if (pageSecondCategory?.category_id !== firstCategoryItem.id) {
			console.log(
				`❌ Page "${slug}" belongs to category ${pageSecondCategory?.category_id}, but requested type "${type}" is category ${firstCategoryItem.id}`,
			)
			return { notFound: true }
		}

		// Get advantages for this page
		const { data: advantages } = await supabase
			.from('advantages')
			.select('*')
			.eq('page_id', typedPageData.id)

		type Advantage = { id: string; title: string; description: string }

		const page: PageModel = {
			_id: typedPageData.id,
			alias: typedPageData.alias,
			title: typedPageData.title,
			tags: typedPageData.tags || [],
			description: typedPageData.description,
			category: typedPageData.category,
			hh: typedPageData.hh_count
				? {
						count: typedPageData.hh_count,
						juniorSalary: typedPageData.hh_junior_salary,
						middleSalary: typedPageData.hh_middle_salary,
						seniorSalary: typedPageData.hh_senior_salary,
				  }
				: { count: 0, juniorSalary: 0, middleSalary: 0, seniorSalary: 0 },
			advantages: ((advantages || []) as Advantage[]).map(adv => ({
				id: adv.id,
				title: adv.title,
				description: adv.description,
			})),
		}

		// Get products for this page
		const { data: productsData } = await supabase
			.from('products')
			.select('*')
			.eq('page_id', typedPageData.id)

		type ProductData = {
			id: string
			alias: string
			title: string
			page_id: string
			product_id: string
			category: string
			price: number
			credit: number
			images: string
			old_price: number
			description: string
			advantages: string
			disadvantages: string
			tags: string[]
			initial_rating: number
			review_count: number
		}
		type Characteristic = { name: string; value: string }
		type Review = {
			id: string
			name: string
			title: string
			description: string
			rating: number
			product_id: string
		}

		const products: ProductModel[] = await Promise.all(
			((productsData || []) as ProductData[]).map(async product => {
				// Get characteristics
				const { data: characteristics } = await supabase
					.from('characteristics')
					.select('*')
					.eq('product_id', product.id)

				// Get reviews
				const { data: reviews } = await supabase
					.from('reviews')
					.select('*')
					.eq('product_id', product.id)

				return {
					alias: product.alias,
					title: product.title,
					_id: product.page_id,
					productId: product.product_id,
					category: product.category,
					price: Number(product.price),
					credit: Number(product.credit),
					images: product.images,
					oldPrice: Number(product.old_price),
					description: product.description,
					advantages: product.advantages || '',
					disadvantages: product.disadvantages || '',
					tags: product.tags || [],
					characteristics: ((characteristics || []) as Characteristic[]).map(c => ({
						name: c.name,
						value: c.value,
					})),
					initialRating: Number(product.initial_rating),
					reviewCount: product.review_count,
					reviews: ((reviews || []) as Review[]).map(r => ({
						_id: r.id,
						name: r.name,
						title: r.title,
						description: r.description,
						rating: r.rating,
						productId: r.product_id,
					})),
				}
			}),
		)

		return {
			props: { menu, page, products, firstCategory: firstCategoryItem.id },
		}
	} catch (error) {
		console.error('Page SSR error:', error)
		return { notFound: true }
	}
}

interface PageProps extends Record<string, unknown> {
	menu: MenuItem[]
	page: PageModel
	products: ProductModel[]
	firstCategory: number
}
