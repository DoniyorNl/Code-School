import styles from './skeleton.module.css'

interface SkeletonProps {
	variant?: 'text' | 'circular' | 'rectangular'
	width?: string | number
	height?: string | number
	className?: string
}

export const Skeleton = ({
	variant = 'text',
	width,
	height,
	className = '',
}: SkeletonProps): JSX.Element => {
	const style = {
		width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
		height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
	}

	return <div className={`${styles.skeleton} ${styles[variant]} ${className}`} style={style} />
}

export default Skeleton
