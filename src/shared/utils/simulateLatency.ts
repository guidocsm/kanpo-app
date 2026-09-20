import { MOCK_LATENCY_MS, MOCK_QUERY_PARAM } from '@/shared/constants/mock'

function isLoadingFrozen(): boolean {
  if (!import.meta.env.DEV) return false
  return new URLSearchParams(window.location.search).get(MOCK_QUERY_PARAM.NAME) === MOCK_QUERY_PARAM.LOADING
}

// Solo para datos mock: en dev, `?mock=loading` deja la promesa pendiente para inspeccionar el skeleton.
export function simulateLatency(): Promise<void> {
  if (isLoadingFrozen()) return new Promise(() => {})
  return new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
}
