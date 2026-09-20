import { useQuery } from '@tanstack/react-query'

import { AUTH_QUERY_KEYS } from '@/modules/auth/constants'
import { getCurrentUser } from '@/modules/auth/services/getCurrentUser'

export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser(),
    queryFn: getCurrentUser
  })
}
