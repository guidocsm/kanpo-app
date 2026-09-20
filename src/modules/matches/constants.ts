export const MATCH_FORMAT = {
  SIX_A_SIDE: '6v6',
  SEVEN_A_SIDE: '7v7',
  EIGHT_A_SIDE: '8v8'
} as const

export const MATCH_SURFACE = {
  SYNTHETIC: 'SYNTHETIC'
} as const

export const MATCH_LEVEL = {
  MIXED: 'MIXED'
} as const

export const MATCH_AVAILABILITY = {
  AVAILABLE: 'AVAILABLE',
  FEW_SLOTS: 'FEW_SLOTS',
  FULL: 'FULL'
} as const

// Con esta cantidad de plazas restantes (o menos) el partido pasa a "pocas plazas".
export const FEW_SLOTS_THRESHOLD = 3

export const MATCH_DETAIL_TAB = {
  INFO: 'info',
  PARTICIPANTS: 'participants',
  RULES: 'rules'
} as const

export const MATCH_QUERY_KEYS = {
  all: ['matches'] as const,
  byDate: (dateKey: string) => [...MATCH_QUERY_KEYS.all, 'by-date', dateKey] as const,
  byId: (matchId: string) => [...MATCH_QUERY_KEYS.all, 'by-id', matchId] as const,
  daySummaries: (dateKeys: string[]) => [...MATCH_QUERY_KEYS.all, 'day-summaries', ...dateKeys] as const
}

export const FEED_VISIBLE_DAYS_COUNT = 5
