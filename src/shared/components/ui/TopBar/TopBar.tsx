import type { ReactNode } from 'react'

import styles from './TopBar.module.scss'

interface TopBarProps {
  leading: ReactNode
  center?: ReactNode
  trailing?: ReactNode
}

export function TopBar({ leading, center, trailing }: TopBarProps) {
  return (
    <header className={styles['top-bar']}>
      {leading}
      {center}
      {trailing}
    </header>
  )
}
