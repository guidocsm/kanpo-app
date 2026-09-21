import { MatchCardSkeleton } from '@/modules/matches/components/MatchCardSkeleton/MatchCardSkeleton'
import styles from './MatchListSkeleton.module.scss'

const MATCH_LIST_SKELETON_KEYS = [0, 1, 2]

export function MatchListSkeleton() {
  return (
    <div
      className={styles['match-list-skeleton']}
      aria-busy="true"
    >
      {MATCH_LIST_SKELETON_KEYS.map((skeletonIndex) => (
        <MatchCardSkeleton key={skeletonIndex} />
      ))}
    </div>
  )
}
