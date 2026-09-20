import { MOCK_QUERY_PARAM, type MockScenario } from '@/shared/constants/mock'

// Solo para datos mock: en dev, `?mock=<scenario>` fuerza un escenario (loading, error) para inspeccionar cada estado.
export function isMockScenarioActive(scenario: MockScenario): boolean {
  if (!import.meta.env.DEV) return false
  return new URLSearchParams(window.location.search).get(MOCK_QUERY_PARAM.NAME) === scenario
}
