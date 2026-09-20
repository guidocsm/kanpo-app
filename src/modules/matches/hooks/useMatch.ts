import { useQuery } from '@tanstack/react-query'

import { MATCH_QUERY_KEYS } from '@/modules/matches/constants'
import { getMatchById } from '@/modules/matches/services/getMatchById'

export function useMatch(matchId: string | undefined) {
  return useQuery({
    queryKey: MATCH_QUERY_KEYS.byId(matchId ?? ''),
    queryFn: () => getMatchById(matchId ?? ''),
    enabled: Boolean(matchId)
  })
}
