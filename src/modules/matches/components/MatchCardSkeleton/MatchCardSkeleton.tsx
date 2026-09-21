import { Card } from '@/shared/components/ui/Card/Card'
import { Divider } from '@/shared/components/ui/Divider/Divider'
import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import styles from './MatchCardSkeleton.module.scss'

export function MatchCardSkeleton() {
  return (
    <Card>
      <div className={styles['match-card-skeleton__header']}>
        <div className={styles['match-card-skeleton__column']}>
          <Skeleton
            width={64}
            height={30}
          />
          <Skeleton
            width={74}
            height={11}
          />
        </div>
        <div className={`${styles['match-card-skeleton__column']} ${styles['match-card-skeleton__column--end']}`}>
          <Skeleton
            width={96}
            height={16}
          />
          <Skeleton
            width={70}
            height={11}
          />
        </div>
      </div>

      <Divider />

      <div className={styles['match-card-skeleton__footer']}>
        <Skeleton
          width={80}
          height={22}
          radius="full"
        />
        <Skeleton
          width={52}
          height={18}
        />
      </div>
    </Card>
  )
}
