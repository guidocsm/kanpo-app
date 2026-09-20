import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import { FEED_VISIBLE_DAYS_COUNT } from '@/modules/matches/constants'
import styles from './MatchDaySelectorSkeleton.module.scss'

const DAY_PILL_SKELETON_HEIGHT = 62
const DAY_PILL_SKELETON_KEYS = Array.from({ length: FEED_VISIBLE_DAYS_COUNT }, (_, dayIndex) => dayIndex)

export function MatchDaySelectorSkeleton() {
  return (
    <div className={styles['match-day-selector-skeleton']}>
      {DAY_PILL_SKELETON_KEYS.map((dayIndex) => (
        <div
          key={dayIndex}
          className={styles['match-day-selector-skeleton__item']}
        >
          <Skeleton
            height={DAY_PILL_SKELETON_HEIGHT}
            radius="md"
          />
        </div>
      ))}
    </div>
  )
}
