import type { ReactNode } from 'react'

import styles from './Badge.module.scss'

interface BadgeProps {
  children: ReactNode
  tone: 'highlight' | 'danger' | 'warning'
  size?: 'md' | 'sm'
}

export function Badge({ children, tone, size = 'md' }: BadgeProps) {
  return <span className={`${styles['badge']} ${styles[`badge--${tone}`]} ${styles[`badge--${size}`]}`}>{children}</span>
}
