import type { MATCH_AVAILABILITY } from '@/modules/matches/constants'
import type { Tables } from '@/shared/types/database'

type MatchRow = Tables<'match'>
type VenueRow = Tables<'venue'>
type MatchFormatRow = Tables<'matchFormat'>

export type MatchAvailability = (typeof MATCH_AVAILABILITY)[keyof typeof MATCH_AVAILABILITY]

export interface Venue {
  name: VenueRow['name']
  zone: VenueRow['zone']
  city: VenueRow['city']
}

export interface VenueDetail extends Venue {
  address: VenueRow['address']
  photoUrl: VenueRow['photoUrl']
}

export interface Match {
  id: MatchRow['id']
  startsAt: MatchRow['startsAt']
  priceUsd: MatchRow['priceAmount']
  occupiedSlots: MatchRow['occupiedSlots']
  totalSlots: MatchFormatRow['totalSlots']
  durationMinutes: MatchFormatRow['durationMin']
  format: MatchFormatRow['name']
  venue: Venue
}

export interface MatchDetail extends Match {
  venue: VenueDetail
  rules: MatchRow['rules']
}

export interface MatchDaySummary {
  dateKey: string
  matchCount: number
}
