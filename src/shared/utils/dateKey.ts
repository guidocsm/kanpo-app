import { addDays, format, isToday, isTomorrow, parseISO } from 'date-fns'

import { DATE_KEY_FORMAT, RELATIVE_DAY, type RelativeDay } from '@/shared/constants/dates'

export function toDateKey(date: Date): string {
  return format(date, DATE_KEY_FORMAT)
}

export function parseDateKey(dateKey: string): Date {
  return parseISO(dateKey)
}

export function getWeekdayStrip(startDate: Date, daysCount: number): Date[] {
  return Array.from({ length: daysCount }, (_, dayIndex) => addDays(startDate, dayIndex))
}

export function getRelativeDay(date: Date): RelativeDay | null {
  if (isToday(date)) return RELATIVE_DAY.TODAY
  if (isTomorrow(date)) return RELATIVE_DAY.TOMORROW
  return null
}
