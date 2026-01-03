import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Test 1: Get categories
		const { data: categories, error: catError } = await supabase.from('categories').select('*')

		if (catError) {
			return res.status(500).json({
				error: 'Categories error',
				details: catError.message,
			})
		}

		// Test 2: Get second categories
		const { data: secondCategories, error: scError } = await supabase
			.from('second_categories')
			.select('*')

		if (scError) {
			return res.status(500).json({
				error: 'Second categories error',
				details: scError.message,
			})
		}

		// Test 3: Get pages
		const { data: pages, error: pagesError } = await supabase.from('pages').select('*').limit(5)

		if (pagesError) {
			return res.status(500).json({
				error: 'Pages error',
				details: pagesError.message,
			})
		}

		// Test 4: Get products
		const { data: products, error: productsError } = await supabase
			.from('products')
			.select('*')
			.limit(5)

		if (productsError) {
			return res.status(500).json({
				error: 'Products error',
				details: productsError.message,
			})
		}

		res.status(200).json({
			success: true,
			data: {
				categories: {
					count: categories?.length || 0,
					items: categories,
				},
				secondCategories: {
					count: secondCategories?.length || 0,
					items: secondCategories,
				},
				pages: {
					count: pages?.length || 0,
					items: pages,
				},
				products: {
					count: products?.length || 0,
					items: products,
				},
			},
		})
	} catch (error: any) {
		res.status(500).json({
			error: 'Server error',
			details: error.message,
		})
	}
}
