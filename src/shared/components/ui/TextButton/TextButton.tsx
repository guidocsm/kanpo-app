import type { ReactNode } from 'react'

import styles from './TextButton.module.scss'

interface TextButtonProps {
  children: ReactNode
  tone?: 'muted' | 'accent'
  onClick: () => void
}

export function TextButton({ children, tone = 'muted', onClick }: TextButtonProps) {
  return (
    <button
      type="button"
      className={`${styles['text-button']} ${styles[`text-button--${tone}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
