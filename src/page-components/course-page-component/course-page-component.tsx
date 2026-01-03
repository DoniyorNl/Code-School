import { AnimatePresence } from 'framer-motion'
import { useEffect, useReducer, useState } from 'react'
import { Advantages, Heading, HhData, Product, Sort, Tag, Text } from '../../components'
import ProductSkeleton from '../../components/product-skeleton/product-skeleton'
import { SortEnum } from '../../components/sort/sort.props'
import styles from './course-page-component.module.css'
import { CoursePageComponentProps } from './course-page-component.props'
import { sortReducer } from './sort.reducer'

const CoursePageComponent = ({ page, products }: CoursePageComponentProps): JSX.Element => {
	const [state, dispatch] = useReducer(sortReducer, { sort: SortEnum.Rating, products: products })
	const [isLoading, setIsLoading] = useState(false)

	const setSort = (sort: SortEnum) => {
		dispatch({ type: sort })
	}

	useEffect(() => {
		setIsLoading(true)
		const timer = setTimeout(() => {
			dispatch({ type: 'reset', initialState: products })
			setIsLoading(false)
		}, 300)
		return () => clearTimeout(timer)
	}, [products])

	const spring = {
		type: 'spring',
		stiffness: 900,
		damping: 45,
	}

	const animations = {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
	}

	return (
		<div className={styles.wrapper}>
			{/* TITLE */}
			<div className={styles.title}>
				<Heading tag='h1'>{page.title}</Heading>
				<Sort sort={state.sort} setSort={setSort} />
			</div>

			{/* PRODUCTS */}
			{isLoading ? (
				<>
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
				</>
			) : (
				<AnimatePresence mode='wait'>
					{state.products &&
						state.products.map((c, idx) => (
							<Product
								key={`${c._id}-${state.sort}-${idx}`}
								layout
								transition={spring}
								{...animations}
								product={c}
							/>
						))}
				</AnimatePresence>
			)}

			{/* VACATIONS */}
			{page.hh && page.hh.count > 0 && (
				<>
					<div className={styles.hhTitle}>
						<Heading tag='h2'>Vacations - {page.category}</Heading>
						<Tag color='red' size='m'>
							hh.uz
						</Tag>
					</div>
					<HhData {...page.hh} />
				</>
			)}

			{/* ADVANTAGES */}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Heading tag='h2'>Advantages</Heading>
					<Advantages advantages={page.advantages} />
				</>
			)}

			{/* DESCRIPTION */}
			<Text>{page.description}</Text>

			{/* SKILLS */}
			<Heading tag='h2'>Skills</Heading>
			{page.tags.length > 0 &&
				page.tags.map((t, idx) => (
					<Tag color='primary' key={`skill-${idx}`}>
						{t}
					</Tag>
				))}
		</div>
	)
}

export default CoursePageComponent
