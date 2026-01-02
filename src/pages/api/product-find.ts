import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

type ProductData = {
	id: string
	alias: string
	title: string
	page_id: string
	product_id: string
	category: string
	price: number
	credit: number
	images: string[]
	old_price: number
	description: string
	advantages: string
	disadvantages: string
	tags: string[]
	initial_rating: number
	review_count: number
}

type CharacteristicData = {
	name: string
	value: string
}

type ReviewData = {
	id: string
	name: string
	title: string
	description: string
	rating: number
	product_id: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { category } = req.body // This is page_id

			// Get products for this page
			const { data: products, error: productsError } = await supabase
				.from('products')
				.select('*')
				.eq('page_id', category)

			if (productsError) throw productsError

			const typedProducts = products as ProductData[]

			// Get characteristics and reviews for each product
			const result = await Promise.all(
				typedProducts.map(async product => {
					// Get characteristics
					const { data: characteristics, error: charError } = await supabase
						.from('characteristics')
						.select('*')
						.eq('product_id', product.id)

					if (charError) throw charError

					const typedCharacteristics = characteristics as CharacteristicData[]

					// Get reviews
					const { data: reviews, error: reviewsError } = await supabase
						.from('reviews')
						.select('*')
						.eq('product_id', product.id)

					if (reviewsError) throw reviewsError

					const typedReviews = reviews as ReviewData[]

					// Format to match old structure
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
						characteristics: typedCharacteristics.map(c => ({
							name: c.name,
							value: c.value,
						})),
						initialRating: Number(product.initial_rating),
						reviewCount: product.review_count,
						reviews: typedReviews.map(r => ({
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

			return res.status(200).json(result)
		} catch (error) {
			console.error('Product-find error:', error)
			const message = error instanceof Error ? error.message : 'Unknown error'
			return res.status(400).json({ error: message })
		}
	}

	return res.status(405).json({ error: 'Method not allowed' })
}
