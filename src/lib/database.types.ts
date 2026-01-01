export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
	public: {
		Tables: {
			categories: {
				Row: {
					id: number
					name: string
					route: string
					created_at: string
				}
				Insert: {
					id?: number
					name: string
					route: string
					created_at?: string
				}
				Update: {
					id?: number
					name?: string
					route?: string
					created_at?: string
				}
			}
			second_categories: {
				Row: {
					id: string
					name: string
					category_id: number
					created_at: string
				}
				Insert: {
					id?: string
					name: string
					category_id: number
					created_at?: string
				}
				Update: {
					id?: string
					name?: string
					category_id?: number
					created_at?: string
				}
			}
			pages: {
				Row: {
					id: string
					alias: string
					title: string
					category: string
					description: string
					tags: string[]
					second_category_id: string
					hh_count: number | null
					hh_junior_salary: number | null
					hh_middle_salary: number | null
					hh_senior_salary: number | null
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					alias: string
					title: string
					category: string
					description: string
					tags?: string[]
					second_category_id: string
					hh_count?: number | null
					hh_junior_salary?: number | null
					hh_middle_salary?: number | null
					hh_senior_salary?: number | null
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					alias?: string
					title?: string
					category?: string
					description?: string
					tags?: string[]
					second_category_id?: string
					hh_count?: number | null
					hh_junior_salary?: number | null
					hh_middle_salary?: number | null
					hh_senior_salary?: number | null
					created_at?: string
					updated_at?: string
				}
			}
			advantages: {
				Row: {
					id: string
					page_id: string
					title: string
					description: string
					created_at: string
				}
				Insert: {
					id?: string
					page_id: string
					title: string
					description: string
					created_at?: string
				}
				Update: {
					id?: string
					page_id?: string
					title?: string
					description?: string
					created_at?: string
				}
			}
			products: {
				Row: {
					id: string
					alias: string
					title: string
					product_id: string
					page_id: string
					category: string
					price: number
					credit: number
					old_price: number
					images: string
					description: string
					advantages: string | null
					disadvantages: string | null
					tags: string[]
					initial_rating: number
					review_count: number
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					alias: string
					title: string
					product_id: string
					page_id: string
					category: string
					price: number
					credit: number
					old_price?: number
					images: string
					description: string
					advantages?: string | null
					disadvantages?: string | null
					tags?: string[]
					initial_rating?: number
					review_count?: number
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					alias?: string
					title?: string
					product_id?: string
					page_id?: string
					category?: string
					price?: number
					credit?: number
					old_price?: number
					images?: string
					description?: string
					advantages?: string | null
					disadvantages?: string | null
					tags?: string[]
					initial_rating?: number
					review_count?: number
					created_at?: string
					updated_at?: string
				}
			}
			characteristics: {
				Row: {
					id: string
					product_id: string
					name: string
					value: string
					created_at: string
				}
				Insert: {
					id?: string
					product_id: string
					name: string
					value: string
					created_at?: string
				}
				Update: {
					id?: string
					product_id?: string
					name?: string
					value?: string
					created_at?: string
				}
			}
			reviews: {
				Row: {
					id: string
					product_id: string
					name: string
					title: string
					description: string
					rating: number
					created_at: string
				}
				Insert: {
					id?: string
					product_id: string
					name: string
					title: string
					description: string
					rating: number
					created_at?: string
				}
				Update: {
					id?: string
					product_id?: string
					name?: string
					title?: string
					description?: string
					rating?: number
					created_at?: string
				}
			}
		}
	}
}
