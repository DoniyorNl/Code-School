import cn from 'classnames'
import Skeleton from '../skeleton/skeleton'
import styles from './product-skeleton.module.css'

interface ProductSkeletonProps {
	className?: string
}

export const ProductSkeleton = ({ className }: ProductSkeletonProps): JSX.Element => {
	return (
		<div className={cn(styles.productSkeleton, className)}>
			<div className={styles.header}>
				<Skeleton variant='rectangular' height={24} width='60%' />
				<Skeleton variant='rectangular' height={20} width={100} />
			</div>

			<div className={styles.priceRow}>
				<Skeleton variant='rectangular' height={32} width={120} />
				<Skeleton variant='rectangular' height={24} width={80} />
			</div>

			<div className={styles.rating}>
				<Skeleton variant='rectangular' height={20} width={120} />
			</div>

			<div className={styles.tags}>
				<Skeleton variant='rectangular' height={24} width={80} />
				<Skeleton variant='rectangular' height={24} width={100} />
				<Skeleton variant='rectangular' height={24} width={90} />
			</div>

			<div className={styles.characteristics}>
				<Skeleton variant='text' width='90%' />
				<Skeleton variant='text' width='85%' />
				<Skeleton variant='text' width='80%' />
			</div>

			<div className={styles.actions}>
				<Skeleton variant='rectangular' height={40} width='100%' />
			</div>
		</div>
	)
}

export default ProductSkeleton
