import type { MATCH_FORMAT } from '@/modules/matches/constants'

export type MatchFormat = (typeof MATCH_FORMAT)[keyof typeof MATCH_FORMAT]

export interface Venue {
  name: string
}

export interface Match {
  id: string
  title: string
  venue: Venue
  startsAt: string
  durationMinutes: number
  format: MatchFormat
  enrolledCount: number
  capacity: number
  priceUsd: number
  isUserNextMatch: boolean
}

export interface MatchDaySummary {
  dateKey: string
  matchCount: number
}
