import type { ReactNode } from 'react'

import { ICON_NAME, type IconName } from '@/shared/constants/icons'

interface IconProps {
  name: IconName
  size?: number
}

interface IconDefinition {
  viewBox: string
  strokeWidth: number
  shapes: ReactNode
}

const DEFAULT_ICON_SIZE = 16

const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
  [ICON_NAME.PIN]: {
    viewBox: '0 0 24 24',
    strokeWidth: 1.8,
    shapes: (
      <>
        <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" />
        <circle
          cx="12"
          cy="9"
          r="2.4"
        />
      </>
    )
  },
  [ICON_NAME.BELL]: {
    viewBox: '0 0 24 24',
    strokeWidth: 1.8,
    shapes: (
      <>
        <path d="M18 16v-5a6 6 0 10-12 0v5l-2 3h16z" />
        <path d="M9.5 20a2.5 2.5 0 005 0" />
      </>
    )
  },
  [ICON_NAME.BALL]: {
    viewBox: '0 0 64 64',
    strokeWidth: 1.6,
    shapes: (
      <>
        <circle
          cx="32"
          cy="32"
          r="25"
        />
        <path d="M32 17l9.5 6.3-3.2 11.2H25.7l-3.2-11.2z" />
        <path d="M32 17V9M41.5 23.3l7.4-5.3M22.5 23.3l-7.4-5.3M38.3 34.5l6.4 8.4M25.7 34.5l-6.4 8.4M19.3 43h25.4" />
      </>
    )
  }
}

export function Icon({ name, size = DEFAULT_ICON_SIZE }: IconProps) {
  const { viewBox, strokeWidth, shapes } = ICON_DEFINITIONS[name]

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes}
    </svg>
  )
}
