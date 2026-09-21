import { useMemo } from 'react'

import { FeedGreeting } from '@/modules/matches/components/FeedGreeting/FeedGreeting'
import { MatchDaySelector } from '@/modules/matches/components/MatchDaySelector/MatchDaySelector'
import { MatchDaySelectorSkeleton } from '@/modules/matches/components/MatchDaySelectorSkeleton/MatchDaySelectorSkeleton'
import { MatchFeedSection } from '@/modules/matches/components/MatchFeedSection/MatchFeedSection'
import { FEED_VISIBLE_DAYS_COUNT } from '@/modules/matches/constants'
import { useMatchDaySummaries } from '@/modules/matches/hooks/useMatchDaySummaries'
import { useMatchesByDate } from '@/modules/matches/hooks/useMatchesByDate'
import { BrandLogo } from '@/shared/components/ui/BrandLogo/BrandLogo'
import { TopBar } from '@/shared/components/ui/TopBar/TopBar'
import { getWeekdayStrip, parseDateKey, toDateKey } from '@/shared/utils/dateKey'
import { useFeedStore } from '@/store/useFeedStore'
import styles from './Feed.module.scss'

export default function Feed() {
  const selectedDateKey = useFeedStore((state) => state.selectedDateKey)
  const setSelectedDateKey = useFeedStore((state) => state.setSelectedDateKey)

  const visibleDateKeys = useMemo(() => getWeekdayStrip(new Date(), FEED_VISIBLE_DAYS_COUNT).map(toDateKey), [])
  const { data: daySummaries, isLoading: isDaySummariesLoading, isError: isDaySummariesError, refetch: refetchDaySummaries } = useMatchDaySummaries(visibleDateKeys)
  const { data: matches, isLoading: isMatchesLoading, isError: isMatchesError, refetch: refetchMatches } = useMatchesByDate(selectedDateKey)

  const selectedDate = useMemo(() => parseDateKey(selectedDateKey), [selectedDateKey])

  const handleFilterClick = () => console.log('Feed: filter clicked')
  const handleNotifyClick = () => console.log('Feed: notify me about new matches clicked')
  const handleRetryClick = () => {
    refetchDaySummaries()
    refetchMatches()
  }

  return (
    <main className={styles['feed']}>
      <div className={styles['feed__top-bar']}>
        <TopBar leading={<BrandLogo />} />
      </div>

      <FeedGreeting selectedDate={selectedDate} />

      {isDaySummariesLoading ? (
        <MatchDaySelectorSkeleton />
      ) : (
        daySummaries && (
          <MatchDaySelector
            days={daySummaries}
            selectedDateKey={selectedDateKey}
            onSelectDate={setSelectedDateKey}
          />
        )
      )}

      <MatchFeedSection
        selectedDate={selectedDate}
        matches={matches}
        isLoading={isDaySummariesLoading || isMatchesLoading}
        isError={isDaySummariesError || isMatchesError}
        onFilterClick={handleFilterClick}
        onNotifyClick={handleNotifyClick}
        onRetryClick={handleRetryClick}
      />
    </main>
  )
}
