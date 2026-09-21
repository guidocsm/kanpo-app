import { addDays, format, parse, startOfDay } from 'date-fns'

import { DATE_KEY_FORMAT } from '@/shared/constants/dates'
import { APP_TZ, toAppDate, toUtcIsoString } from '@/shared/utils/appTimeZone'

// Clave de día ('yyyy-MM-dd') en hora de Caracas.
export function toDateKey(date: Date): string {
  return format(toAppDate(date), DATE_KEY_FORMAT)
}

// Medianoche de Caracas del día indicado.
export function parseDateKey(dateKey: string): Date {
  return parse(dateKey, DATE_KEY_FORMAT, new Date(), { in: APP_TZ })
}

export function getWeekdayStrip(startDate: Date, daysCount: number): Date[] {
  const firstDay = startOfDay(toAppDate(startDate))
  return Array.from({ length: daysCount }, (_, dayIndex) => addDays(firstDay, dayIndex))
}

// Rango [from, before) en UTC que cubre todos los días indicados, medido en hora de Caracas.
export function getDateKeysRange(dateKeys: string[]): { from: string; before: string } {
  const sortedDateKeys = [...dateKeys].sort()
  const firstDay = parseDateKey(sortedDateKeys[0])
  const lastDay = parseDateKey(sortedDateKeys[sortedDateKeys.length - 1])

  return {
    from: toUtcIsoString(firstDay),
    before: toUtcIsoString(addDays(lastDay, 1))
  }
}
