import { MatchCard } from '@/modules/matches/components/MatchCard/MatchCard'
import type { Match } from '@/modules/matches/types/match'
import styles from './MatchList.module.scss'

interface MatchListProps {
  matches: Match[]
}

export function MatchList({ matches }: MatchListProps) {
  return (
    <ul className={styles['match-list']}>
      {matches.map((match) => (
        <li key={match.id}>
          <MatchCard match={match} />
        </li>
      ))}
    </ul>
  )
}
