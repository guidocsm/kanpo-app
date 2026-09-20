import { format, getISOWeek, getYear, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

import { DATE_FORMAT } from '@/shared/constants/dates'
import { capitalizeFirstLetter } from '@/shared/utils/capitalizeFirstLetter'

export function formatMatchTime(startsAt: string): string {
  return format(parseISO(startsAt), DATE_FORMAT.MATCH_TIME, { locale: es })
}

export function formatDayLabel(date: Date): string {
  return capitalizeFirstLetter(format(date, DATE_FORMAT.DAY_LABEL, { locale: es }))
}

export function formatWeekdayShort(date: Date): string {
  return format(date, DATE_FORMAT.WEEKDAY_SHORT, { locale: es })
}

export function formatDayNumber(date: Date): string {
  return format(date, DATE_FORMAT.DAY_NUMBER, { locale: es })
}

export function getWeekLabelValues(date: Date) {
  return {
    week: getISOWeek(date),
    month: format(date, DATE_FORMAT.MONTH_SHORT, { locale: es }),
    year: getYear(date)
  }
}
