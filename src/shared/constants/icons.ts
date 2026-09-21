export const ICON_NAME = {
  PIN: 'pin',
  BELL: 'bell',
  BALL: 'ball',
  CHEVRON_LEFT: 'chevron-left',
  ARROW_RIGHT: 'arrow-right',
  BOOKMARK: 'bookmark',
  SHARE: 'share',
  CLOCK: 'clock'
} as const

export type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME]
