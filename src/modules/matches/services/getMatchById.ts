import { createMatchDetailsMock } from '@/modules/matches/mocks/matchesMock'
import type { MatchDetail } from '@/modules/matches/types/match'
import { MOCK_ERROR_MESSAGE, MOCK_QUERY_PARAM } from '@/shared/constants/mock'
import { isMockScenarioActive } from '@/shared/utils/mockScenario'
import { simulateLatency } from '@/shared/utils/simulateLatency'

// MOCK: sustituir el cuerpo por la consulta a Supabase; la firma se mantiene.
// Devuelve `null` si el partido no existe (404); lanza si la consulta falla (`?mock=error` en dev).
export async function getMatchById(matchId: string): Promise<MatchDetail | null> {
  await simulateLatency()

  if (isMockScenarioActive(MOCK_QUERY_PARAM.ERROR)) throw new Error(MOCK_ERROR_MESSAGE)

  return createMatchDetailsMock(new Date()).find((matchDetail) => matchDetail.id === matchId) ?? null
}
