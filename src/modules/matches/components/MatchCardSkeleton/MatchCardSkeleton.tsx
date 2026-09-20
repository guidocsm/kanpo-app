import { Card } from '@/shared/components/ui/Card/Card'
import { Divider } from '@/shared/components/ui/Divider/Divider'
import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import styles from './MatchCardSkeleton.module.scss'

interface MatchCardSkeletonProps {
  variant: 'featured' | 'default'
}

export function MatchCardSkeleton({ variant }: MatchCardSkeletonProps) {
  const isFeatured = variant === 'featured'
  const skeletonTone = isFeatured ? 'dark' : 'light'

  return (
    <Card tone={isFeatured ? 'dark' : 'light'}>
      <div className={styles['match-card-skeleton__header']}>
        <div className={styles['match-card-skeleton__column']}>
          <Skeleton
            width={64}
            height={30}
            tone={skeletonTone}
          />
          <Skeleton
            width={74}
            height={11}
            tone={skeletonTone}
          />
        </div>
        <div className={`${styles['match-card-skeleton__column']} ${styles['match-card-skeleton__column--end']}`}>
          <Skeleton
            width={96}
            height={16}
            tone={skeletonTone}
          />
          <Skeleton
            width={70}
            height={11}
            tone={skeletonTone}
          />
        </div>
      </div>

      <Divider tone={isFeatured ? 'dark' : 'light'} />

      <div className={styles['match-card-skeleton__footer']}>
        <Skeleton
          width={80}
          height={22}
          radius="full"
          tone={skeletonTone}
        />
        <Skeleton
          width={52}
          height={18}
          tone={skeletonTone}
        />
      </div>
    </Card>
  )
}
