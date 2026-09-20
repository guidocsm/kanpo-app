import { addMinutes, format, getISOWeek, getYear, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

import { DATE_FORMAT, MERIDIEM, TIME_RANGE_SEPARATOR } from '@/shared/constants/dates'
import { capitalizeFirstLetter } from '@/shared/utils/capitalizeFirstLetter'

export function formatMatchTime(startsAt: string): string {
  return format(parseISO(startsAt), DATE_FORMAT.MATCH_TIME, { locale: es })
}

export function formatDayLabel(date: Date): string {
  return capitalizeFirstLetter(format(date, DATE_FORMAT.DAY_LABEL, { locale: es }))
}

// "Lunes 13 de abril"
export function formatLongDayLabel(startsAt: string): string {
  return capitalizeFirstLetter(format(parseISO(startsAt), DATE_FORMAT.LONG_DAY_LABEL, { locale: es }))
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

// Formato de hora del detalle: 12 horas con am/pm en minúscula ("09:00am"). Cambiar aquí lo cambia en todas las pantallas.
function formatTime12Hour(date: Date): string {
  const meridiem = date.getHours() < 12 ? MERIDIEM.AM : MERIDIEM.PM
  return `${format(date, DATE_FORMAT.TIME_12H)}${meridiem}`
}

// "09:00am – 10:00am"
export function formatMatchTimeRange(startsAt: string, durationMinutes: number): string {
  const startDate = parseISO(startsAt)
  const endDate = addMinutes(startDate, durationMinutes)

  return `${formatTime12Hour(startDate)}${TIME_RANGE_SEPARATOR}${formatTime12Hour(endDate)}`
}
