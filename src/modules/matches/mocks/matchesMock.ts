import { addDays, setHours, setMinutes, startOfDay } from 'date-fns'

import { MATCH_FORMAT, MATCH_LEVEL, MATCH_SURFACE } from '@/modules/matches/constants'
import type { Match, MatchDetail, MatchFormat, Organizer, Venue } from '@/modules/matches/types/match'

interface MatchMockSeed {
  dayOffset: number
  hours: number
  minutes: number
  code: string
  title: string
  venue: Venue
  fieldName: string
  durationMinutes: number
  format: MatchFormat
  enrolledCount: number
  capacity: number
  priceUsd: number
  organizer: Organizer
  organizerNote?: string
  isUserNextMatch?: boolean
}

const VENUE_MOCKS = {
  EL_HATILLO: { name: 'El Hatillo', city: 'Caracas' },
  LOS_PALOS_GRANDES: { name: 'Los Palos Grandes', city: 'Caracas' },
  CANCHA_JC: { name: 'Cancha JC', city: 'Caracas' }
} satisfies Record<string, Venue>

const ORGANIZER_MOCKS = {
  ANDRES_FRANCO: { fullName: 'Andrés Franco', organizedMatchesCount: 23, rating: 4.9 },
  MARIA_RIVAS: { fullName: 'María Rivas', organizedMatchesCount: 41, rating: 4.7 },
  LUIS_PEREZ: { fullName: 'Luis Pérez', organizedMatchesCount: 12, rating: 4.5 }
} satisfies Record<string, Organizer>

// Los offsets son relativos a la fecha de referencia para que el mock siempre caiga dentro del selector de días.
// 0 = hoy, 1 = mañana. El día +4 queda sin partidos a propósito (estado vacío).
// Estados del detalle: match-3 (4/14) normal, match-9 (14/16) pocas plazas, match-5 (12/12) lleno.
const MATCH_MOCK_SEEDS: MatchMockSeed[] = [
  {
    dayOffset: 0,
    hours: 18,
    minutes: 0,
    code: 'AG-0801',
    title: 'Ávila Gol',
    venue: VENUE_MOCKS.EL_HATILLO,
    fieldName: 'Cancha 1',
    durationMinutes: 60,
    format: MATCH_FORMAT.SEVEN_A_SIDE,
    enrolledCount: 6,
    capacity: 14,
    priceUsd: 4.99,
    organizer: ORGANIZER_MOCKS.ANDRES_FRANCO,
    organizerNote: 'Traer camiseta clara y oscura. Hay chalecos para el equipo que lo necesite.'
  },
  {
    dayOffset: 0,
    hours: 20,
    minutes: 0,
    code: 'LN-0501',
    title: 'Liga Norte 5',
    venue: VENUE_MOCKS.CANCHA_JC,
    fieldName: 'Cancha 3',
    durationMinutes: 90,
    format: MATCH_FORMAT.EIGHT_A_SIDE,
    enrolledCount: 11,
    capacity: 16,
    priceUsd: 6.5,
    organizer: ORGANIZER_MOCKS.LUIS_PEREZ
  },
  {
    dayOffset: 1,
    hours: 9,
    minutes: 0,
    code: 'AG-0901',
    title: 'Ávila Gol',
    venue: VENUE_MOCKS.EL_HATILLO,
    fieldName: 'Cancha 2',
    durationMinutes: 60,
    format: MATCH_FORMAT.SEVEN_A_SIDE,
    enrolledCount: 4,
    capacity: 14,
    priceUsd: 4.99,
    organizer: ORGANIZER_MOCKS.ANDRES_FRANCO,
    organizerNote: 'Cancha techada. Hay estacionamiento gratuito en la entrada, por la Av. Sanz.',
    isUserNextMatch: true
  },
  {
    dayOffset: 1,
    hours: 10,
    minutes: 0,
    code: 'AG-1001',
    title: 'Ávila Gol',
    venue: VENUE_MOCKS.EL_HATILLO,
    fieldName: 'Cancha 2',
    durationMinutes: 60,
    format: MATCH_FORMAT.SEVEN_A_SIDE,
    enrolledCount: 9,
    capacity: 14,
    priceUsd: 4.99,
    organizer: ORGANIZER_MOCKS.ANDRES_FRANCO,
    organizerNote: 'Cancha techada. Hay estacionamiento gratuito en la entrada, por la Av. Sanz.'
  },
  {
    dayOffset: 1,
    hours: 11,
    minutes: 0,
    code: 'CF-1101',
    title: 'Caracas FC Pickup',
    venue: VENUE_MOCKS.LOS_PALOS_GRANDES,
    fieldName: 'Cancha 1',
    durationMinutes: 45,
    format: MATCH_FORMAT.SIX_A_SIDE,
    enrolledCount: 12,
    capacity: 12,
    priceUsd: 3.99,
    organizer: ORGANIZER_MOCKS.MARIA_RIVAS,
    organizerNote: 'Puntualidad: a los 10 minutos se libera el cupo a la lista de espera.'
  },
  {
    dayOffset: 1,
    hours: 17,
    minutes: 30,
    code: 'LN-1701',
    title: 'Liga Norte 5',
    venue: VENUE_MOCKS.CANCHA_JC,
    fieldName: 'Cancha 3',
    durationMinutes: 90,
    format: MATCH_FORMAT.EIGHT_A_SIDE,
    enrolledCount: 2,
    capacity: 16,
    priceUsd: 6.5,
    organizer: ORGANIZER_MOCKS.LUIS_PEREZ
  },
  {
    dayOffset: 2,
    hours: 19,
    minutes: 0,
    code: 'CF-1901',
    title: 'Caracas FC Pickup',
    venue: VENUE_MOCKS.LOS_PALOS_GRANDES,
    fieldName: 'Cancha 1',
    durationMinutes: 60,
    format: MATCH_FORMAT.SIX_A_SIDE,
    enrolledCount: 7,
    capacity: 12,
    priceUsd: 3.99,
    organizer: ORGANIZER_MOCKS.MARIA_RIVAS
  },
  {
    dayOffset: 3,
    hours: 8,
    minutes: 0,
    code: 'AG-1208',
    title: 'Ávila Gol',
    venue: VENUE_MOCKS.EL_HATILLO,
    fieldName: 'Cancha 2',
    durationMinutes: 60,
    format: MATCH_FORMAT.SEVEN_A_SIDE,
    enrolledCount: 1,
    capacity: 14,
    priceUsd: 4.99,
    organizer: ORGANIZER_MOCKS.ANDRES_FRANCO,
    organizerNote: 'Cancha techada. Hay estacionamiento gratuito en la entrada, por la Av. Sanz.'
  },
  {
    dayOffset: 3,
    hours: 21,
    minutes: 0,
    code: 'LN-2101',
    title: 'Liga Norte 5',
    venue: VENUE_MOCKS.CANCHA_JC,
    fieldName: 'Cancha 3',
    durationMinutes: 90,
    format: MATCH_FORMAT.EIGHT_A_SIDE,
    enrolledCount: 14,
    capacity: 16,
    priceUsd: 6.5,
    organizer: ORGANIZER_MOCKS.LUIS_PEREZ,
    organizerNote: 'Quedan pocas plazas, confirma tu pago cuanto antes.'
  }
]

// Fuente única de los mocks: el Feed y el detalle salen de las mismas semillas.
export function createMatchDetailsMock(referenceDate: Date): MatchDetail[] {
  return MATCH_MOCK_SEEDS.map((seed, seedIndex) => {
    const matchDay = addDays(startOfDay(referenceDate), seed.dayOffset)
    const startsAt = setMinutes(setHours(matchDay, seed.hours), seed.minutes)

    return {
      id: `match-${seedIndex + 1}`,
      code: seed.code,
      title: seed.title,
      venue: seed.venue,
      fieldName: seed.fieldName,
      startsAt: startsAt.toISOString(),
      durationMinutes: seed.durationMinutes,
      format: seed.format,
      surface: MATCH_SURFACE.SYNTHETIC,
      level: MATCH_LEVEL.MIXED,
      enrolledCount: seed.enrolledCount,
      capacity: seed.capacity,
      priceUsd: seed.priceUsd,
      organizer: seed.organizer,
      organizerNote: seed.organizerNote,
      isUserNextMatch: seed.isUserNextMatch ?? false
    }
  })
}

// Lo que devolvería la consulta del Feed: solo los campos de `Match`, sin los del detalle.
export function createMatchesMock(referenceDate: Date): Match[] {
  return createMatchDetailsMock(referenceDate).map((matchDetail) => ({
    id: matchDetail.id,
    title: matchDetail.title,
    venue: matchDetail.venue,
    startsAt: matchDetail.startsAt,
    durationMinutes: matchDetail.durationMinutes,
    format: matchDetail.format,
    enrolledCount: matchDetail.enrolledCount,
    capacity: matchDetail.capacity,
    priceUsd: matchDetail.priceUsd,
    isUserNextMatch: matchDetail.isUserNextMatch
  }))
}
