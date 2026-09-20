import { useQuery } from '@tanstack/react-query'

import { MATCH_QUERY_KEYS } from '@/modules/matches/constants'
import { getMatchesByDate } from '@/modules/matches/services/getMatchesByDate'

export function useMatchesByDate(dateKey: string) {
  return useQuery({
    queryKey: MATCH_QUERY_KEYS.byDate(dateKey),
    queryFn: () => getMatchesByDate(dateKey)
  })
}
