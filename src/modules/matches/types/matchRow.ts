import type { Tables } from '@/shared/types/database'

// Forma de las filas que devuelven los selects de constants.ts (fila de `match` con `venue` y `matchFormat` embebidos).

type MatchFormatColumns = Pick<Tables<'matchFormat'>, 'name' | 'totalSlots' | 'durationMin'>

export interface MatchListRow extends Pick<Tables<'match'>, 'id' | 'startsAt' | 'priceAmount' | 'occupiedSlots'> {
  venue: Pick<Tables<'venue'>, 'name' | 'zone' | 'city'>
  matchFormat: MatchFormatColumns
}

export interface MatchDetailRow extends Pick<Tables<'match'>, 'id' | 'startsAt' | 'priceAmount' | 'occupiedSlots' | 'rules'> {
  venue: Pick<Tables<'venue'>, 'name' | 'zone' | 'address' | 'city' | 'photoUrl'>
  matchFormat: MatchFormatColumns
}

export interface MatchDaySummaryRow extends Pick<Tables<'match'>, 'startsAt'> {
  venue: Pick<Tables<'venue'>, 'city'>
}
