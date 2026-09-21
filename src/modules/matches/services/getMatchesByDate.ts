import { supabase } from '@/core/http/client'
import { MATCH_LIST_SELECT, MATCH_STATUS } from '@/modules/matches/constants'
import type { Match } from '@/modules/matches/types/match'
import { mapMatchListRow } from '@/modules/matches/utils/mapMatchRows'
import type { City } from '@/shared/types/city'
import { clampToNowIso } from '@/shared/utils/appTimeZone'
import { getDateKeysRange } from '@/shared/utils/dateKey'

interface GetMatchesByDateParams {
  dateKey: string
  city: City
}

// Partidos abiertos del día (hora de Caracas) que aún no han empezado, de la ciudad indicada.
export async function getMatchesByDate({ dateKey, city }: GetMatchesByDateParams): Promise<Match[]> {
  const { from, before } = getDateKeysRange([dateKey])

  // Sin reintento propio de postgrest-js: ya reintenta React Query una vez (core/plugins/query.ts) y sumar ambos
  // dejaba el skeleton 12-20 s antes de mostrar el error.
  const { data, error } = await supabase
    .from('match')
    .select(MATCH_LIST_SELECT)
    .eq('status', MATCH_STATUS.OPEN)
    .eq('venue.city', city)
    .gte('startsAt', clampToNowIso(from))
    .lt('startsAt', before)
    .order('startsAt', { ascending: true })
    .retry(false)

  if (error) throw error

  return data.map(mapMatchListRow)
}
