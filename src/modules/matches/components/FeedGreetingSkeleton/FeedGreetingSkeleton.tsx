import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import styles from './FeedGreetingSkeleton.module.scss'

export function FeedGreetingSkeleton() {
  return (
    <div className={styles['feed-greeting-skeleton']}>
      <Skeleton
        width={150}
        height={11}
      />
      <div className={styles['feed-greeting-skeleton__title']}>
        <Skeleton
          width={220}
          height={26}
        />
        <Skeleton
          width={170}
          height={26}
        />
      </div>
    </div>
  )
}
