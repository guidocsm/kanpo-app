import { FEW_SLOTS_THRESHOLD, MATCH_AVAILABILITY } from '@/modules/matches/constants'
import type { Match, MatchAvailability } from '@/modules/matches/types/match'

type MatchSlots = Pick<Match, 'capacity' | 'enrolledCount'>

export function getRemainingSlots({ capacity, enrolledCount }: MatchSlots): number {
  return Math.max(capacity - enrolledCount, 0)
}

export function getMatchAvailability(match: MatchSlots): MatchAvailability {
  const remainingSlots = getRemainingSlots(match)

  if (remainingSlots === 0) return MATCH_AVAILABILITY.FULL
  if (remainingSlots <= FEW_SLOTS_THRESHOLD) return MATCH_AVAILABILITY.FEW_SLOTS
  return MATCH_AVAILABILITY.AVAILABLE
}
