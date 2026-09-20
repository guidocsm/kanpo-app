import type { ReactNode } from 'react'

import styles from './Card.module.scss'

interface CardProps {
  children: ReactNode
  tone?: 'light' | 'dark'
}

export function Card({ children, tone = 'light' }: CardProps) {
  return <article className={`${styles['card']} ${styles[`card--${tone}`]}`}>{children}</article>
}
