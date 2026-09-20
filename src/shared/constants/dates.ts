export const DATE_KEY_FORMAT = 'yyyy-MM-dd'

export const DATE_FORMAT = {
  MATCH_TIME: 'HH:mm',
  DAY_LABEL: 'EEEE d MMMM',
  WEEKDAY_SHORT: 'EEE',
  DAY_NUMBER: 'd',
  MONTH_SHORT: 'MMM'
} as const

export const RELATIVE_DAY = {
  TODAY: 'TODAY',
  TOMORROW: 'TOMORROW'
} as const

export type RelativeDay = (typeof RELATIVE_DAY)[keyof typeof RELATIVE_DAY]
