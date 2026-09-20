export const DATE_KEY_FORMAT = 'yyyy-MM-dd'

export const DATE_FORMAT = {
  MATCH_TIME: 'HH:mm',
  DAY_LABEL: 'EEEE d MMMM',
  WEEKDAY_SHORT: 'EEE',
  DAY_NUMBER: 'd',
  MONTH_SHORT: 'MMM',
  LONG_DAY_LABEL: "EEEE d 'de' MMMM",
  TIME_12H: 'hh:mm'
} as const

export const MERIDIEM = {
  AM: 'am',
  PM: 'pm'
} as const

export const TIME_RANGE_SEPARATOR = ' – '

export const RELATIVE_DAY = {
  TODAY: 'TODAY',
  TOMORROW: 'TOMORROW'
} as const

export type RelativeDay = (typeof RELATIVE_DAY)[keyof typeof RELATIVE_DAY]
