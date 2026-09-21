import { FEW_SLOTS_THRESHOLD, MATCH_AVAILABILITY } from '@/modules/matches/constants'
import type { Match, MatchAvailability } from '@/modules/matches/types/match'

type MatchSlots = Pick<Match, 'totalSlots' | 'occupiedSlots'>

export function getRemainingSlots({ totalSlots, occupiedSlots }: MatchSlots): number {
  return Math.max(totalSlots - occupiedSlots, 0)
}

export function getMatchAvailability(match: MatchSlots): MatchAvailability {
  const remainingSlots = getRemainingSlots(match)

  if (remainingSlots === 0) return MATCH_AVAILABILITY.FULL
  if (remainingSlots <= FEW_SLOTS_THRESHOLD) return MATCH_AVAILABILITY.FEW_SLOTS
  return MATCH_AVAILABILITY.AVAILABLE
}
