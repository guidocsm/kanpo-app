import type { ReactNode } from 'react'

import { ICON_NAME, type IconName } from '@/shared/constants/icons'

interface IconProps {
  name: IconName
  size?: number
}

interface IconDefinition {
  viewBox: string
  strokeWidth: number
  isFilled?: boolean
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
  },
  [ICON_NAME.CHEVRON_LEFT]: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    shapes: <path d="M15 18l-6-6 6-6" />
  },
  [ICON_NAME.ARROW_RIGHT]: {
    viewBox: '0 0 24 24',
    strokeWidth: 2.2,
    shapes: (
      <>
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
        />
        <polyline points="12 5 19 12 12 19" />
      </>
    )
  },
  [ICON_NAME.BOOKMARK]: {
    viewBox: '0 0 24 24',
    strokeWidth: 1.8,
    shapes: <path d="M6 3.5h12v17l-6-4-6 4z" />
  },
  [ICON_NAME.SHARE]: {
    viewBox: '0 0 24 24',
    strokeWidth: 1.8,
    shapes: (
      <>
        <circle
          cx="18"
          cy="5"
          r="3"
        />
        <circle
          cx="6"
          cy="12"
          r="3"
        />
        <circle
          cx="18"
          cy="19"
          r="3"
        />
        <line
          x1="8.6"
          y1="10.6"
          x2="15.4"
          y2="6.4"
        />
        <line
          x1="8.6"
          y1="13.4"
          x2="15.4"
          y2="17.6"
        />
      </>
    )
  },
  [ICON_NAME.CLOCK]: {
    viewBox: '0 0 24 24',
    strokeWidth: 1.8,
    shapes: (
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M12 7v5l3.5 2" />
      </>
    )
  },
  [ICON_NAME.STAR]: {
    viewBox: '0 0 24 24',
    strokeWidth: 0,
    isFilled: true,
    shapes: <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
  }
}

export function Icon({ name, size = DEFAULT_ICON_SIZE }: IconProps) {
  const { viewBox, strokeWidth, isFilled = false, shapes } = ICON_DEFINITIONS[name]

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
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
