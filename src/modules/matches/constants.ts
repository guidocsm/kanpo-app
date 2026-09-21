import type { Enums } from '@/shared/types/database'
import type { City } from '@/shared/types/city'

export const MATCH_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
} as const satisfies Record<string, Enums<'matchstatus'>>

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
  byDate: (city: City, dateKey: string) => [...MATCH_QUERY_KEYS.all, 'by-date', city, dateKey] as const,
  byId: (city: City, matchId: string) => [...MATCH_QUERY_KEYS.all, 'by-id', city, matchId] as const,
  daySummaries: (city: City, dateKeys: string[]) => [...MATCH_QUERY_KEYS.all, 'day-summaries', city, ...dateKeys] as const
}

// Selects de Supabase. Deben ser literales para que el cliente tipado infiera las filas.
export const MATCH_LIST_SELECT = 'id, startsAt, priceAmount, occupiedSlots, venue!inner(name, zone), matchFormat!inner(name, totalSlots, durationMin)' as const

export const MATCH_DETAIL_SELECT = 'id, startsAt, priceAmount, occupiedSlots, rules, venue!inner(name, zone, address, city, photoUrl), matchFormat!inner(name, totalSlots, durationMin)' as const

export const MATCH_DAY_SUMMARY_SELECT = 'startsAt, venue!inner(city)' as const

export const FEED_VISIBLE_DAYS_COUNT = 5
