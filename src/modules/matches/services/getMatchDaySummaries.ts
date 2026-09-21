import { supabase } from '@/core/http/client'
import { MATCH_DAY_SUMMARY_SELECT, MATCH_STATUS } from '@/modules/matches/constants'
import type { MatchDaySummary } from '@/modules/matches/types/match'
import type { City } from '@/shared/types/city'
import { clampToNowIso } from '@/shared/utils/appTimeZone'
import { getDateKeysRange, toDateKey } from '@/shared/utils/dateKey'

interface GetMatchDaySummariesParams {
  dateKeys: string[]
  city: City
}

// Cuántos partidos abiertos (aún no iniciados) hay en cada día: alimenta los puntos del selector de días.
export async function getMatchDaySummaries({ dateKeys, city }: GetMatchDaySummariesParams): Promise<MatchDaySummary[]> {
  if (dateKeys.length === 0) return []

  const { from, before } = getDateKeysRange(dateKeys)

  const { data, error } = await supabase
    .from('match')
    .select(MATCH_DAY_SUMMARY_SELECT)
    .eq('status', MATCH_STATUS.OPEN)
    .eq('venue.city', city)
    .gte('startsAt', clampToNowIso(from))
    .lt('startsAt', before)

  if (error) throw error

  const matchCountByDateKey = new Map<string, number>()
  data.forEach((row) => {
    const dateKey = toDateKey(new Date(row.startsAt))
    matchCountByDateKey.set(dateKey, (matchCountByDateKey.get(dateKey) ?? 0) + 1)
  })

  return dateKeys.map((dateKey) => ({ dateKey, matchCount: matchCountByDateKey.get(dateKey) ?? 0 }))
}
