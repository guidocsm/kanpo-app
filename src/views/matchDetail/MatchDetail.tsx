import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router'

import { MatchDetailHeader } from '@/modules/matches/components/MatchDetailHeader/MatchDetailHeader'
import { MatchDetailSkeleton } from '@/modules/matches/components/MatchDetailSkeleton/MatchDetailSkeleton'
import { MatchDetailTabs } from '@/modules/matches/components/MatchDetailTabs/MatchDetailTabs'
import { MatchEnrollBar } from '@/modules/matches/components/MatchEnrollBar/MatchEnrollBar'
import { MatchHero } from '@/modules/matches/components/MatchHero/MatchHero'
import { MatchSpecs } from '@/modules/matches/components/MatchSpecs/MatchSpecs'
import { MatchTitleBlock } from '@/modules/matches/components/MatchTitleBlock/MatchTitleBlock'
import { useMatch } from '@/modules/matches/hooks/useMatch'
import { getMatchAvailability, getRemainingSlots } from '@/modules/matches/utils/getMatchAvailability'
import { NotFoundState } from '@/shared/components/ui/NotFoundState/NotFoundState'
import { ROUTES } from '@/shared/constants/routes'
import { useGoBack } from '@/shared/hooks/useGoBack'
import { scrollToTop } from '@/shared/utils/scroll'
import styles from './MatchDetail.module.scss'

export default function MatchDetail() {
  const { matchId } = useParams()
  const goBack = useGoBack()
  const { data: match, isLoading, isError } = useMatch(matchId)

  const handleBookmarkClick = () => console.log('MatchDetail: bookmark clicked', matchId)
  const handleShareClick = () => console.log('MatchDetail: share clicked', matchId)
  const handleEnrollClick = () => console.log('MatchDetail: enroll clicked', matchId)
  const handleWaitlistClick = () => console.log('MatchDetail: waitlist clicked', matchId)

  useEffect(() => {
    scrollToTop()
  }, [matchId])

  if (isError)
    return (
      <Navigate
        to={ROUTES.FEED}
        replace
      />
    )

  if (isLoading) {
    return (
      <main className={styles['match-detail']}>
        <MatchDetailSkeleton />
      </main>
    )
  }

  if (!match) {
    return (
      <main className={styles['match-detail']}>
        <NotFoundState />
      </main>
    )
  }

  return (
    <main className={styles['match-detail']}>
      <MatchDetailHeader
        onBackClick={goBack}
        onBookmarkClick={handleBookmarkClick}
        onShareClick={handleShareClick}
      />
      <MatchHero photoUrl={match.venue.photoUrl} />
      <MatchTitleBlock
        venue={match.venue}
        availability={getMatchAvailability(match)}
        remainingSlots={getRemainingSlots(match)}
      />
      <div className={styles['match-detail__specs']}>
        <MatchSpecs
          format={match.format}
          durationMinutes={match.durationMinutes}
        />
      </div>
      <MatchDetailTabs match={match} />
      <MatchEnrollBar
        match={match}
        onEnrollClick={handleEnrollClick}
        onWaitlistClick={handleWaitlistClick}
      />
    </main>
  )
}
