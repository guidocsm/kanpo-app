import { useTranslation } from 'react-i18next'

import { MatchList } from '@/modules/matches/components/MatchList/MatchList'
import { MatchListHeader } from '@/modules/matches/components/MatchListHeader/MatchListHeader'
import { MatchListHeaderSkeleton } from '@/modules/matches/components/MatchListHeaderSkeleton/MatchListHeaderSkeleton'
import { MatchListSkeleton } from '@/modules/matches/components/MatchListSkeleton/MatchListSkeleton'
import { NoMatchesState } from '@/modules/matches/components/NoMatchesState/NoMatchesState'
import type { Match } from '@/modules/matches/types/match'
import { EmptyState } from '@/shared/components/ui/EmptyState/EmptyState'
import { ICON_NAME } from '@/shared/constants/icons'
import styles from './MatchFeedSection.module.scss'

interface MatchFeedSectionProps {
  selectedDate: Date
  matches: Match[] | undefined
  isLoading: boolean
  isError: boolean
  onFilterClick: () => void
  onNotifyClick: () => void
  onRetryClick: () => void
}

export function MatchFeedSection({ selectedDate, matches, isLoading, isError, onFilterClick, onNotifyClick, onRetryClick }: MatchFeedSectionProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <section className={styles['match-feed-section']}>
        <MatchListHeaderSkeleton />
        <MatchListSkeleton />
      </section>
    )
  }

  if (isError || !matches) {
    return (
      <section className={styles['match-feed-section']}>
        <EmptyState
          icon={ICON_NAME.BALL}
          title={t('MATCHES.ERROR.TITLE')}
          description={t('MATCHES.ERROR.DESCRIPTION')}
          actionLabel={t('MATCHES.ERROR.RETRY_BUTTON')}
          onAction={onRetryClick}
        />
      </section>
    )
  }

  return (
    <section className={styles['match-feed-section']}>
      <MatchListHeader
        selectedDate={selectedDate}
        matchCount={matches.length}
        onFilterClick={onFilterClick}
      />
      {matches.length === 0 ? <NoMatchesState onNotifyClick={onNotifyClick} /> : <MatchList matches={matches} />}
    </section>
  )
}
