import type { MATCH_AVAILABILITY, MATCH_FORMAT, MATCH_LEVEL, MATCH_SURFACE } from '@/modules/matches/constants'

export type MatchFormat = (typeof MATCH_FORMAT)[keyof typeof MATCH_FORMAT]
export type MatchSurface = (typeof MATCH_SURFACE)[keyof typeof MATCH_SURFACE]
export type MatchLevel = (typeof MATCH_LEVEL)[keyof typeof MATCH_LEVEL]
export type MatchAvailability = (typeof MATCH_AVAILABILITY)[keyof typeof MATCH_AVAILABILITY]

export interface Venue {
  name: string
  city: string
}

export interface Organizer {
  fullName: string
  organizedMatchesCount: number
  rating: number
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

export interface MatchDetail extends Match {
  code: string
  fieldName: string
  surface: MatchSurface
  level: MatchLevel
  organizer: Organizer
  organizerNote?: string
}

export interface MatchDaySummary {
  dateKey: string
  matchCount: number
}
