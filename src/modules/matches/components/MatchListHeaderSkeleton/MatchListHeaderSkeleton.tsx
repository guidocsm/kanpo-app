import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import styles from './MatchListHeaderSkeleton.module.scss'

export function MatchListHeaderSkeleton() {
  return (
    <div className={styles['match-list-header-skeleton']}>
      <Skeleton
        width={150}
        height={14}
      />
      <Skeleton
        width={60}
        height={14}
      />
    </div>
  )
}
