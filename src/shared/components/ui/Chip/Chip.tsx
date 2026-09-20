import type { ReactNode } from 'react'

import styles from './Chip.module.scss'

interface ChipProps {
  children: ReactNode
  tone?: 'default' | 'onDark'
}

export function Chip({ children, tone = 'default' }: ChipProps) {
  const toneClassName = tone === 'onDark' ? styles['chip--on-dark'] : ''

  return <span className={`${styles['chip']} ${toneClassName}`}>{children}</span>
}
