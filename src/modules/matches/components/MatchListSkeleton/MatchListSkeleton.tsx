import { MatchCardSkeleton } from '@/modules/matches/components/MatchCardSkeleton/MatchCardSkeleton'
import styles from './MatchListSkeleton.module.scss'

const MATCH_LIST_SKELETON_VARIANTS = ['featured', 'default', 'default'] as const

export function MatchListSkeleton() {
  return (
    <div
      className={styles['match-list-skeleton']}
      aria-busy="true"
    >
      {MATCH_LIST_SKELETON_VARIANTS.map((variant, skeletonIndex) => (
        <MatchCardSkeleton
          key={skeletonIndex}
          variant={variant}
        />
      ))}
    </div>
  )
}
