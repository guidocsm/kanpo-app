import { TZDate, tz } from '@date-fns/tz'

import { APP_TIME_ZONE } from '@/shared/constants/dates'

// Contexto de zona horaria para la opción `in` de date-fns.
export const APP_TZ = tz(APP_TIME_ZONE)

// Convierte un instante (Date o ISO string) a una fecha que se lee siempre en hora de Caracas,
// sin depender de la zona horaria del dispositivo.
export function toAppDate(date: Date | string): TZDate {
  return new TZDate(new Date(date), APP_TIME_ZONE)
}

export function toUtcIsoString(date: Date): string {
  return new Date(date.getTime()).toISOString()
}

// Devuelve el más tardío entre `isoDate` y el instante actual: sirve para ocultar partidos que ya empezaron.
export function clampToNowIso(isoDate: string): string {
  const nowIso = new Date().toISOString()
  return isoDate > nowIso ? isoDate : nowIso
}
