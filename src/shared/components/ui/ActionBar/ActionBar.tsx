import type { ReactNode } from 'react'

import styles from './ActionBar.module.scss'

interface ActionBarProps {
  children: ReactNode
}

export function ActionBar({ children }: ActionBarProps) {
  return (
    <div className={styles['action-bar']}>
      <div className={styles['action-bar__content']}>{children}</div>
    </div>
  )
}
