import { useQuery } from '@tanstack/react-query'

import { MATCH_QUERY_KEYS } from '@/modules/matches/constants'
import { getMatchDaySummaries } from '@/modules/matches/services/getMatchDaySummaries'

export function useMatchDaySummaries(dateKeys: string[]) {
  return useQuery({
    queryKey: MATCH_QUERY_KEYS.daySummaries(dateKeys),
    queryFn: () => getMatchDaySummaries(dateKeys)
  })
}
