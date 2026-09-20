import styles from './Skeleton.module.scss'

interface SkeletonProps {
  height: string | number
  width?: string | number
  radius?: 'sm' | 'md' | 'lg' | 'full'
  tone?: 'light' | 'dark'
}

export function Skeleton({ height, width = '100%', radius = 'sm', tone = 'light' }: SkeletonProps) {
  return (
    <span
      className={`${styles['skeleton']} ${styles[`skeleton--${tone}`]} ${styles[`skeleton--radius-${radius}`]}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
