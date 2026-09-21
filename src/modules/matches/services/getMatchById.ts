import { supabase } from '@/core/http/client'
import { MATCH_DETAIL_SELECT, MATCH_STATUS } from '@/modules/matches/constants'
import type { MatchDetail } from '@/modules/matches/types/match'
import { mapMatchDetailRow } from '@/modules/matches/utils/mapMatchRows'
import type { City } from '@/shared/types/city'
import { getNowIso } from '@/shared/utils/appTimeZone'
import { isUuid } from '@/shared/utils/isUuid'

interface GetMatchByIdParams {
  matchId: string
  city: City
}

// Devuelve `null` si el partido no existe, no está abierto, ya empezó o es de otra ciudad (la pantalla muestra 404).
// Un id que no es uuid también es `null`: Postgres lo rechazaría con un error 400 en vez de "no encontrado".
export async function getMatchById({ matchId, city }: GetMatchByIdParams): Promise<MatchDetail | null> {
  if (!isUuid(matchId)) return null

  const { data, error } = await supabase.from('match').select(MATCH_DETAIL_SELECT).eq('id', matchId).eq('status', MATCH_STATUS.OPEN).eq('venue.city', city).gt('startsAt', getNowIso()).maybeSingle()

  if (error) throw error

  return data ? mapMatchDetailRow(data) : null
}
