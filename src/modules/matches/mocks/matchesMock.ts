import { addDays, setHours, setMinutes, startOfDay } from 'date-fns'

import { MATCH_FORMAT } from '@/modules/matches/constants'
import type { Match, MatchFormat } from '@/modules/matches/types/match'

interface MatchMockSeed {
  dayOffset: number
  hours: number
  minutes: number
  title: string
  venueName: string
  durationMinutes: number
  format: MatchFormat
  enrolledCount: number
  capacity: number
  priceUsd: number
  isUserNextMatch?: boolean
}

// Los offsets son relativos a la fecha de referencia para que el mock siempre caiga dentro del selector de días.
// 0 = hoy, 1 = mañana. El día +4 queda sin partidos a propósito (estado vacío).
const MATCH_MOCK_SEEDS: MatchMockSeed[] = [
  { dayOffset: 0, hours: 18, minutes: 0, title: 'Ávila Gol', venueName: 'El Hatillo', durationMinutes: 60, format: MATCH_FORMAT.SEVEN_A_SIDE, enrolledCount: 6, capacity: 14, priceUsd: 4.99 },
  { dayOffset: 0, hours: 20, minutes: 0, title: 'Liga Norte 5', venueName: 'Cancha JC', durationMinutes: 90, format: MATCH_FORMAT.EIGHT_A_SIDE, enrolledCount: 11, capacity: 16, priceUsd: 6.5 },
  {
    dayOffset: 1,
    hours: 9,
    minutes: 0,
    title: 'Ávila Gol',
    venueName: 'El Hatillo',
    durationMinutes: 60,
    format: MATCH_FORMAT.SEVEN_A_SIDE,
    enrolledCount: 4,
    capacity: 14,
    priceUsd: 4.99,
    isUserNextMatch: true
  },
  { dayOffset: 1, hours: 10, minutes: 0, title: 'Ávila Gol', venueName: 'El Hatillo', durationMinutes: 60, format: MATCH_FORMAT.SEVEN_A_SIDE, enrolledCount: 9, capacity: 14, priceUsd: 4.99 },
  {
    dayOffset: 1,
    hours: 11,
    minutes: 0,
    title: 'Caracas FC Pickup',
    venueName: 'Los Palos Grandes',
    durationMinutes: 45,
    format: MATCH_FORMAT.SIX_A_SIDE,
    enrolledCount: 12,
    capacity: 12,
    priceUsd: 3.99
  },
  { dayOffset: 1, hours: 17, minutes: 30, title: 'Liga Norte 5', venueName: 'Cancha JC', durationMinutes: 90, format: MATCH_FORMAT.EIGHT_A_SIDE, enrolledCount: 2, capacity: 16, priceUsd: 6.5 },
  {
    dayOffset: 2,
    hours: 19,
    minutes: 0,
    title: 'Caracas FC Pickup',
    venueName: 'Los Palos Grandes',
    durationMinutes: 60,
    format: MATCH_FORMAT.SIX_A_SIDE,
    enrolledCount: 7,
    capacity: 12,
    priceUsd: 3.99
  },
  { dayOffset: 3, hours: 8, minutes: 0, title: 'Ávila Gol', venueName: 'El Hatillo', durationMinutes: 60, format: MATCH_FORMAT.SEVEN_A_SIDE, enrolledCount: 1, capacity: 14, priceUsd: 4.99 },
  { dayOffset: 3, hours: 21, minutes: 0, title: 'Liga Norte 5', venueName: 'Cancha JC', durationMinutes: 90, format: MATCH_FORMAT.EIGHT_A_SIDE, enrolledCount: 14, capacity: 16, priceUsd: 6.5 }
]

export function createMatchesMock(referenceDate: Date): Match[] {
  return MATCH_MOCK_SEEDS.map((seed, seedIndex) => {
    const matchDay = addDays(startOfDay(referenceDate), seed.dayOffset)
    const startsAt = setMinutes(setHours(matchDay, seed.hours), seed.minutes)

    return {
      id: `match-${seedIndex + 1}`,
      title: seed.title,
      venue: { name: seed.venueName },
      startsAt: startsAt.toISOString(),
      durationMinutes: seed.durationMinutes,
      format: seed.format,
      enrolledCount: seed.enrolledCount,
      capacity: seed.capacity,
      priceUsd: seed.priceUsd,
      isUserNextMatch: seed.isUserNextMatch ?? false
    }
  })
}
