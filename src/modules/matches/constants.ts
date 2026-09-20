export const MATCH_FORMAT = {
  SIX_A_SIDE: '6v6',
  SEVEN_A_SIDE: '7v7',
  EIGHT_A_SIDE: '8v8'
} as const

export const MATCH_QUERY_KEYS = {
  all: ['matches'] as const,
  byDate: (dateKey: string) => [...MATCH_QUERY_KEYS.all, 'by-date', dateKey] as const,
  daySummaries: (dateKeys: string[]) => [...MATCH_QUERY_KEYS.all, 'day-summaries', ...dateKeys] as const
}

export const FEED_VISIBLE_DAYS_COUNT = 5
