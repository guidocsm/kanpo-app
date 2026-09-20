export const MOCK_LATENCY_MS = 700

export const MOCK_QUERY_PARAM = {
  NAME: 'mock',
  LOADING: 'loading',
  ERROR: 'error'
} as const

export type MockScenario = Exclude<(typeof MOCK_QUERY_PARAM)[keyof typeof MOCK_QUERY_PARAM], typeof MOCK_QUERY_PARAM.NAME>

export const MOCK_ERROR_MESSAGE = 'Mock error: simulated request failure'
