import cn from 'classnames'
import { motion } from 'framer-motion'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import {
	FaAngular,
	FaBook,
	FaBriefcase,
	FaBullhorn,
	FaChartLine,
	FaCode,
	FaCog,
	FaFigma,
	FaInstagram,
	FaLightbulb,
	FaMobileAlt,
	FaPaintBrush,
	FaReact,
	FaSearchDollar,
	FaTasks,
	FaVuejs,
} from 'react-icons/fa'
import {
	SiAdobeillustrator,
	SiAdobephotoshop,
	SiNextdotjs,
	SiNodedotjs,
	SiNuxtdotjs,
	SiRedux,
} from 'react-icons/si'
import { v4 as uuidv4 } from 'uuid'
import { convertToUSD, dedectedReview } from '../../helpers/helpers'
import Button from '../button/button'
import Card from '../card/card'
import Divider from '../divider/divider'
import Rating from '../rating/rating'
import ReivewForm from '../review-form/review-form'
import Review from '../review/review'
import Tag from '../tag/tag'
import styles from './product.module.css'
import { ProductProps } from './product.props'

const getProductIcon = (title: string, tags: string[]) => {
	const titleLower = title.toLowerCase()
	const allTags = tags.map(t => t.toLowerCase()).join(' ')

	// React variants
	if (titleLower.includes('react advanced') || titleLower.includes('redux')) {
		return <SiRedux style={{ fontSize: '70px', color: '#764ABC' }} title='Redux' />
	}
	if (
		titleLower.includes('react') &&
		(titleLower.includes('fullstack') || titleLower.includes('full-stack'))
	) {
		return <SiNodedotjs style={{ fontSize: '70px', color: '#339933' }} title='Full-Stack' />
	}
	if (titleLower.includes('react')) {
		return <FaReact style={{ fontSize: '70px', color: '#61DAFB' }} title='React' />
	}

	// Vue variants
	if (titleLower.includes('nuxt')) {
		return <SiNuxtdotjs style={{ fontSize: '70px', color: '#00C58E' }} title='Nuxt.js' />
	}
	if (titleLower.includes('vue')) {
		return <FaVuejs style={{ fontSize: '70px', color: '#42B883' }} title='Vue.js' />
	}

	// Angular
	if (titleLower.includes('angular')) {
		return <FaAngular style={{ fontSize: '70px', color: '#DD0031' }} title='Angular' />
	}

	// Next.js
	if (titleLower.includes('next')) {
		return <SiNextdotjs style={{ fontSize: '70px', color: '#000000' }} title='Next.js' />
	}

	// Design
	if (titleLower.includes('ui/ux') || allTags.includes('ui') || allTags.includes('ux')) {
		return <FaFigma style={{ fontSize: '70px', color: '#F24E1E' }} title='UI/UX Design' />
	}
	if (titleLower.includes('photoshop') || allTags.includes('photoshop')) {
		return <SiAdobephotoshop style={{ fontSize: '70px', color: '#31A8FF' }} title='Photoshop' />
	}
	if (titleLower.includes('illustrator') || allTags.includes('illustrator')) {
		return <SiAdobeillustrator style={{ fontSize: '70px', color: '#FF9A00' }} title='Illustrator' />
	}
	if (titleLower.includes('graphic') || allTags.includes('graphic')) {
		return <FaPaintBrush style={{ fontSize: '70px', color: '#FF0000' }} title='Graphic Design' />
	}
	if (titleLower.includes('web design')) {
		return <FaPaintBrush style={{ fontSize: '70px', color: '#FF6B6B' }} title='Web Design' />
	}

	// Marketing
	if (titleLower.includes('digital marketing')) {
		return <FaBullhorn style={{ fontSize: '70px', color: '#FF6B35' }} title='Digital Marketing' />
	}
	if (titleLower.includes('smm') || allTags.includes('smm')) {
		return <FaInstagram style={{ fontSize: '70px', color: '#E1306C' }} title='SMM' />
	}
	if (titleLower.includes('seo') || allTags.includes('seo')) {
		return <FaSearchDollar style={{ fontSize: '70px', color: '#4285F4' }} title='SEO' />
	}

	// Business
	if (titleLower.includes('analytics') || allTags.includes('analytics')) {
		return <FaChartLine style={{ fontSize: '70px', color: '#10B981' }} title='Business Analytics' />
	}
	if (titleLower.includes('startup') || allTags.includes('startup')) {
		return <FaLightbulb style={{ fontSize: '70px', color: '#FCD34D' }} title='Startup' />
	}
	if (titleLower.includes('project management') || allTags.includes('pm')) {
		return <FaTasks style={{ fontSize: '70px', color: '#8B5CF6' }} title='Project Management' />
	}

	// Books
	if (titleLower.includes('book') || allTags.includes('book')) {
		return <FaBook style={{ fontSize: '70px', color: '#F59E0B' }} title='Book' />
	}

	// Services
	if (titleLower.includes('consulting')) {
		return <FaBriefcase style={{ fontSize: '70px', color: '#6366F1' }} title='Consulting' />
	}
	if (titleLower.includes('web development')) {
		return <FaCode style={{ fontSize: '70px', color: '#14B8A6' }} title='Web Development' />
	}
	if (titleLower.includes('mobile')) {
		return <FaMobileAlt style={{ fontSize: '70px', color: '#EC4899' }} title='Mobile Development' />
	}
	if (titleLower.includes('software') || titleLower.includes('development')) {
		return <FaCog style={{ fontSize: '70px', color: '#64748B' }} title='Software Development' />
	}

	// Default fallback
	return <FaCode style={{ fontSize: '70px', color: '#6B7280' }} title='Course' />
}

const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>,
		): JSX.Element => {
			const [reviewOpen, setReviewOpen] = useState<boolean>(false)
			const reviewRef = useRef<HTMLDivElement>(null)

			const variants = {
				visible: {
					opacity: 1,
					height: 'auto',
				},
				hidden: {
					opacity: 0,
					height: 0,
				},
			}

			const scrollToReview = () => {
				setReviewOpen(true)
				reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}

			return (
				<div className={className} ref={ref} {...props}>
					<Card className={styles.product}>
						<div className={styles.logo}>{getProductIcon(product.title, product.tags)}</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							{convertToUSD(product.price)}
							{product.oldPrice && (
								<Tag color='green' className={styles.oldPrice}>
									{convertToUSD(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							{convertToUSD(product.credit)}/<span className={styles.month}>month</span>
						</div>
						<div className={styles.rating}>
							<Rating rating={product.initialRating} />
						</div>
						<div className={styles.tags}>
							{product.tags.length > 0 &&
								product.tags.map(t => (
									<Tag key={uuidv4()} className={styles.category} color={'primary'}>
										{t}
									</Tag>
								))}
						</div>
						<div className={styles.priceTitle}>Price</div>
						<div className={styles.creditTitle}>Credit</div>
						<div className={styles.rateTitle}>
							<a href='#review' onClick={scrollToReview}>
								{product.reviewCount} {dedectedReview(product.reviewCount)}
							</a>
						</div>

						<Divider className={styles.hr} />

						<div className={styles.description}>{product.description}</div>

						<div className={styles.features}>
							{product.characteristics.length > 0 &&
								product.characteristics.map(ch => (
									<div className={styles.characteristic} key={uuidv4()}>
										<span className={styles.characteristicName}>{ch.name}</span>
										<span className={styles.characteristicDots}></span>
										<span className={styles.characteristicValue}>{ch.value}</span>
									</div>
								))}
						</div>

						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advantageTitle}>Advantages</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.disadvantageTitle}>Disadvantages</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>

						<Divider className={styles.hr2} />

						<div className={styles.actions}>
							<Button appearance='primary'>More Details</Button>
							<Button
								appearance='ghost'
								arrow={reviewOpen ? 'down' : 'right'}
								className={styles.reviewBtn}
								onClick={() => setReviewOpen(prev => !prev)}
							>
								Review
							</Button>
						</div>
					</Card>

					<motion.div
						animate={reviewOpen ? 'visible' : 'hidden'}
						variants={variants}
						initial={'hidden'}
					>
						<Card color='white' ref={reviewRef} className={cn(styles.reviews)}>
							{product.reviews.map(r => (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							))}
							<ReivewForm productid={product._id} />
						</Card>
					</motion.div>
				</div>
			)
		},
	),
)

export default Product
