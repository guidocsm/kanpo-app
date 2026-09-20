export const ICON_NAME = {
  PIN: 'pin',
  BELL: 'bell',
  BALL: 'ball'
} as const

export type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME]
