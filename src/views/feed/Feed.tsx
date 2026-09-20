import { useMemo } from 'react'

import { UserBalanceChip } from '@/modules/auth/components/UserBalanceChip/UserBalanceChip'
import { useCurrentUser } from '@/modules/auth/hooks/useCurrentUser'
import { FeedGreeting } from '@/modules/matches/components/FeedGreeting/FeedGreeting'
import { FeedGreetingSkeleton } from '@/modules/matches/components/FeedGreetingSkeleton/FeedGreetingSkeleton'
import { MatchDaySelector } from '@/modules/matches/components/MatchDaySelector/MatchDaySelector'
import { MatchDaySelectorSkeleton } from '@/modules/matches/components/MatchDaySelectorSkeleton/MatchDaySelectorSkeleton'
import { MatchFeedSection } from '@/modules/matches/components/MatchFeedSection/MatchFeedSection'
import { FEED_VISIBLE_DAYS_COUNT } from '@/modules/matches/constants'
import { useMatchDaySummaries } from '@/modules/matches/hooks/useMatchDaySummaries'
import { useMatchesByDate } from '@/modules/matches/hooks/useMatchesByDate'
import { BrandLogo } from '@/shared/components/ui/BrandLogo/BrandLogo'
import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import { TopBar } from '@/shared/components/ui/TopBar/TopBar'
import { getWeekdayStrip, parseDateKey, toDateKey } from '@/shared/utils/dateKey'
import { useFeedStore } from '@/store/useFeedStore'
import styles from './Feed.module.scss'

const BALANCE_CHIP_SKELETON_WIDTH = 112
const BALANCE_CHIP_SKELETON_HEIGHT = 40

export default function Feed() {
  const selectedDateKey = useFeedStore((state) => state.selectedDateKey)
  const setSelectedDateKey = useFeedStore((state) => state.setSelectedDateKey)

  const { data: currentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError, refetch: refetchCurrentUser } = useCurrentUser()

  const visibleDateKeys = useMemo(() => getWeekdayStrip(new Date(), FEED_VISIBLE_DAYS_COUNT).map(toDateKey), [])
  const { data: daySummaries, isLoading: isDaySummariesLoading, isError: isDaySummariesError, refetch: refetchDaySummaries } = useMatchDaySummaries(visibleDateKeys)
  const { data: matches, isLoading: isMatchesLoading, isError: isMatchesError, refetch: refetchMatches } = useMatchesByDate(selectedDateKey)

  const selectedDate = useMemo(() => parseDateKey(selectedDateKey), [selectedDateKey])
  const isHeaderLoading = isCurrentUserLoading || isDaySummariesLoading
  const isAnyError = isCurrentUserError || isDaySummariesError || isMatchesError

  const handleFilterClick = () => console.log('Feed: filter clicked')
  const handleNotifyClick = () => console.log('Feed: notify me about new matches clicked')
  const handleRetryClick = () => {
    refetchCurrentUser()
    refetchDaySummaries()
    refetchMatches()
  }

  const balanceChip = currentUser ? (
    <UserBalanceChip
      balanceUsd={currentUser.balanceUsd}
      initials={currentUser.initials}
    />
  ) : isCurrentUserLoading ? (
    <Skeleton
      width={BALANCE_CHIP_SKELETON_WIDTH}
      height={BALANCE_CHIP_SKELETON_HEIGHT}
      radius="full"
    />
  ) : null

  return (
    <main className={styles['feed']}>
      <div className={styles['feed__top-bar']}>
        <TopBar
          leading={<BrandLogo />}
          trailing={balanceChip}
        />
      </div>

      {isHeaderLoading ? (
        <>
          <FeedGreetingSkeleton />
          <MatchDaySelectorSkeleton />
        </>
      ) : (
        <>
          {currentUser && (
            <FeedGreeting
              firstName={currentUser.firstName}
              selectedDate={selectedDate}
            />
          )}
          {daySummaries && (
            <MatchDaySelector
              days={daySummaries}
              selectedDateKey={selectedDateKey}
              onSelectDate={setSelectedDateKey}
            />
          )}
        </>
      )}

      <MatchFeedSection
        selectedDate={selectedDate}
        matches={matches}
        isLoading={isHeaderLoading || isMatchesLoading}
        isError={isAnyError}
        onFilterClick={handleFilterClick}
        onNotifyClick={handleNotifyClick}
        onRetryClick={handleRetryClick}
      />
    </main>
  )
}
