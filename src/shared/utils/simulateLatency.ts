import { MOCK_LATENCY_MS, MOCK_QUERY_PARAM } from '@/shared/constants/mock'
import { isMockScenarioActive } from '@/shared/utils/mockScenario'

// Solo para datos mock: en dev, `?mock=loading` deja la promesa pendiente para inspeccionar el skeleton.
export function simulateLatency(): Promise<void> {
  if (isMockScenarioActive(MOCK_QUERY_PARAM.LOADING)) return new Promise(() => {})
  return new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
}
