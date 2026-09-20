import { parseISO } from 'date-fns'

import { createMatchesMock } from '@/modules/matches/mocks/matchesMock'
import type { MatchDaySummary } from '@/modules/matches/types/match'
import { toDateKey } from '@/shared/utils/dateKey'
import { simulateLatency } from '@/shared/utils/simulateLatency'

// MOCK: sustituir el cuerpo por la consulta a Supabase; la firma se mantiene.
export async function getMatchDaySummaries(dateKeys: string[]): Promise<MatchDaySummary[]> {
  await simulateLatency()

  const matches = createMatchesMock(new Date())

  return dateKeys.map((dateKey) => ({
    dateKey,
    matchCount: matches.filter((match) => toDateKey(parseISO(match.startsAt)) === dateKey).length
  }))
}
