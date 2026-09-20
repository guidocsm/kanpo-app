import { generatePath } from 'react-router'

import { ROUTES } from '@/shared/constants/routes'

export function getMatchDetailPath(matchId: string): string {
  return generatePath(ROUTES.MATCH_DETAIL, { matchId })
}
