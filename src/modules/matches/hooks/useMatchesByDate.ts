import { useQuery } from '@tanstack/react-query'

import { MATCH_QUERY_KEYS } from '@/modules/matches/constants'
import { getMatchesByDate } from '@/modules/matches/services/getMatchesByDate'
import { DEFAULT_CITY } from '@/shared/constants/cities'

export function useMatchesByDate(dateKey: string) {
  // Fase 1: solo Caracas. Aquí se leerá la ciudad del selector o de la geolocalización.
  const city = DEFAULT_CITY

  return useQuery({
    queryKey: MATCH_QUERY_KEYS.byDate(city, dateKey),
    queryFn: () => getMatchesByDate({ dateKey, city })
  })
}
