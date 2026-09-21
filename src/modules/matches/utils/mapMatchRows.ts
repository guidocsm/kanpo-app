import type { Match, MatchDetail } from '@/modules/matches/types/match'
import type { MatchDetailRow, MatchListRow } from '@/modules/matches/types/matchRow'

// Traduce las filas de Supabase al modelo de dominio (nombres de la UI, ver types/match.ts).

export function mapMatchListRow(row: MatchListRow): Match {
  return {
    id: row.id,
    startsAt: row.startsAt,
    priceUsd: row.priceAmount,
    occupiedSlots: row.occupiedSlots,
    totalSlots: row.matchFormat.totalSlots,
    durationMinutes: row.matchFormat.durationMin,
    format: row.matchFormat.name,
    venue: { name: row.venue.name, zone: row.venue.zone }
  }
}

export function mapMatchDetailRow(row: MatchDetailRow): MatchDetail {
  return {
    id: row.id,
    startsAt: row.startsAt,
    priceUsd: row.priceAmount,
    occupiedSlots: row.occupiedSlots,
    totalSlots: row.matchFormat.totalSlots,
    durationMinutes: row.matchFormat.durationMin,
    format: row.matchFormat.name,
    rules: row.rules,
    venue: {
      name: row.venue.name,
      zone: row.venue.zone,
      address: row.venue.address,
      city: row.venue.city,
      photoUrl: row.venue.photoUrl
    }
  }
}
