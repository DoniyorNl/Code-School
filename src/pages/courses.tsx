import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { Heading, Text } from '../components'
import { logger } from '../helpers/logger'
import { safeGetServerSideProps } from '../helpers/ssr'
import { MenuItem } from '../interfaces/menu.interface'
import { PageCategory } from '../interfaces/page.interface'
import { withLayout } from '../layout/layout'
import Seo from '../layout/seo/seo'
import styles from '../styles/courses.module.css'

const Courses = ({ menu }: CoursesPageProps): JSX.Element => {
	return (
		<Seo
			metaTitle='Courses - Learn Programming and Design'
			metaDescription='Explore our comprehensive courses in programming, web development, and design. Start learning today!'
			metaKeyword='programming courses, web development, design courses, online learning'
		>
			<div className={styles.coursesPage}>
				<div className={styles.header}>
					<GraduationCap size={48} className={styles.icon} />
					<Heading tag='h1'>Barcha Kurslar</Heading>
					<Text size='l'>
						Professional dasturlash va dizayn kurslarimiz bilan o'z karyerangizni boshlang
					</Text>
				</div>

				<div className={styles.categories}>
					{menu.map((category, idx) => (
						<div key={idx} className={styles.category}>
							<Heading tag='h2' className={styles.categoryTitle}>
								{category._id.secondCategory}
							</Heading>
							<div className={styles.coursesList}>
								{category.pages.map(page => (
									<Link
										key={page._id}
										href={`/courses/${page.alias}`}
										className={styles.courseCard}
									>
										<div className={styles.cardContent}>
											<Heading tag='h3' className={styles.courseTitle}>
												{page.title}
											</Heading>
											<Text className={styles.courseCategory}>{page.category}</Text>
										</div>
										<div className={styles.arrow}>→</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				{menu.length === 0 && (
					<div className={styles.empty}>
						<Text size='l'>Hozircha kurslar mavjud emas</Text>
					</div>
				)}
			</div>
		</Seo>
	)
}

export default withLayout(Courses)

export const getServerSideProps = safeGetServerSideProps(async () => {
	const { supabase } = await import('../lib/supabase')

	const { data: secondCategories, error: catError } = await supabase
		.from('second_categories')
		.select('id, name')
		.eq('category_id', PageCategory.Courses)

	if (catError) {
		logger.error('Error fetching categories:', catError)
		throw catError
	}

	const menu: MenuItem[] = await Promise.all(
		((secondCategories || []) as Array<{ id: string; name: string }>).map(async secondCat => {
			const { data: pages, error: pagesError } = await supabase
				.from('pages')
				.select('id, alias, title, category')
				.eq('second_category_id', secondCat.id)
				.order('title', { ascending: true })

			if (pagesError) {
				logger.error('Error fetching pages:', pagesError)
				throw pagesError
			}

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

	const filteredMenu = menu.filter(item => item.pages.length > 0)

	return {
		props: {
			menu: filteredMenu,
			firstCategory: PageCategory.Courses,
		},
	}
})

interface CoursesPageProps {
	menu: MenuItem[]
	firstCategory: PageCategory
}
