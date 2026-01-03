import Seo from '@/src/layout/seo/seo'
import { CoursePageComponent } from '@/src/page-components'
import { GetServerSideProps } from 'next'
import { firstLevelMenu } from '../../helpers/constants'
import { logger } from '../../helpers/logger'
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

		// Optimized: Get menu (second categories with pages) in fewer queries
		const { data: secondCategories } = await supabase
			.from('second_categories')
			.select('id, name')
			.eq('category_id', firstCategoryItem.id)

		// Get all pages for all second_categories in one query
		const secondCategoryIds = ((secondCategories || []) as Array<{ id: string; name: string }>).map(
			sc => sc.id,
		)

		const { data: allPages } = await supabase
			.from('pages')
			.select('id, alias, title, category, second_category_id')
			.in('second_category_id', secondCategoryIds)

		// Group pages by second_category_id
		const pagesBySecondCategory = new Map<
			string,
			Array<{ id: string; alias: string; title: string; category: string }>
		>()
		;(
			(allPages || []) as Array<{
				id: string
				alias: string
				title: string
				category: string
				second_category_id: string
			}>
		).forEach(page => {
			if (!pagesBySecondCategory.has(page.second_category_id)) {
				pagesBySecondCategory.set(page.second_category_id, [])
			}
			pagesBySecondCategory.get(page.second_category_id)!.push({
				id: page.id,
				alias: page.alias,
				title: page.title,
				category: page.category,
			})
		})

		const menu: MenuItem[] = (
			(secondCategories || []) as Array<{
				id: string
				name: string
			}>
		).map(secondCat => ({
			_id: { secondCategory: secondCat.name },
			pages: (pagesBySecondCategory.get(secondCat.id) || []).map(p => ({
				alias: p.alias,
				title: p.title,
				_id: p.id,
				category: p.category,
			})),
		}))

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
			logger.log(
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

		// Optimized: Get all characteristics and reviews in one query each
		const productIds = ((productsData || []) as ProductData[]).map(p => p.id)

		const [characteristicsResult, reviewsResult] = await Promise.all([
			supabase.from('characteristics').select('*').in('product_id', productIds),
			supabase.from('reviews').select('*').in('product_id', productIds),
		])

		// Group by product_id for fast lookup
		const characteristicsByProduct = new Map<string, Characteristic[]>()
		const reviewsByProduct = new Map<string, Review[]>()

		;((characteristicsResult.data || []) as Characteristic[]).forEach(char => {
			const productId = (char as any).product_id
			if (!characteristicsByProduct.has(productId)) {
				characteristicsByProduct.set(productId, [])
			}
			characteristicsByProduct.get(productId)!.push(char)
		})
		;((reviewsResult.data || []) as Review[]).forEach(review => {
			if (!reviewsByProduct.has(review.product_id)) {
				reviewsByProduct.set(review.product_id, [])
			}
			reviewsByProduct.get(review.product_id)!.push(review)
		})

		const products: ProductModel[] = ((productsData || []) as ProductData[]).map(product => {
			const characteristics = characteristicsByProduct.get(product.id) || []
			const reviews = reviewsByProduct.get(product.id) || []

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
				characteristics: characteristics.map(c => ({
					name: c.name,
					value: c.value,
				})),
				initialRating: Number(product.initial_rating),
				reviewCount: product.review_count,
				reviews: reviews.map(r => ({
					_id: r.id,
					name: r.name,
					title: r.title,
					description: r.description,
					rating: r.rating,
					productId: r.product_id,
				})),
			}
		})

		return {
			props: { menu, page, products, firstCategory: firstCategoryItem.id },
		}
	} catch (error) {
		logger.error('Page SSR error:', error)
		return { notFound: true }
	}
}

interface PageProps extends Record<string, unknown> {
	menu: MenuItem[]
	page: PageModel
	products: ProductModel[]
	firstCategory: number
}
