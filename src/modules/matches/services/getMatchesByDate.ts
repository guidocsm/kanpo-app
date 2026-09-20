import { parseISO } from 'date-fns'

import { createMatchesMock } from '@/modules/matches/mocks/matchesMock'
import type { Match } from '@/modules/matches/types/match'
import { toDateKey } from '@/shared/utils/dateKey'
import { simulateLatency } from '@/shared/utils/simulateLatency'

// MOCK: sustituir el cuerpo por la consulta a Supabase; la firma se mantiene.
export async function getMatchesByDate(dateKey: string): Promise<Match[]> {
  await simulateLatency()

  return createMatchesMock(new Date())
    .filter((match) => toDateKey(parseISO(match.startsAt)) === dateKey)
    .sort((firstMatch, secondMatch) => firstMatch.startsAt.localeCompare(secondMatch.startsAt))
}
