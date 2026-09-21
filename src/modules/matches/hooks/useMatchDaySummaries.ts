import { useQuery } from '@tanstack/react-query'

import { MATCH_QUERY_KEYS } from '@/modules/matches/constants'
import { getMatchDaySummaries } from '@/modules/matches/services/getMatchDaySummaries'
import { DEFAULT_CITY } from '@/shared/constants/cities'

export function useMatchDaySummaries(dateKeys: string[]) {
  const city = DEFAULT_CITY

  return useQuery({
    queryKey: MATCH_QUERY_KEYS.daySummaries(city, dateKeys),
    queryFn: () => getMatchDaySummaries({ dateKeys, city })
  })
}
