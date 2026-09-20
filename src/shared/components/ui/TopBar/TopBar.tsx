import type { ReactNode } from 'react'

import styles from './TopBar.module.scss'

interface TopBarProps {
  leading: ReactNode
  trailing?: ReactNode
}

export function TopBar({ leading, trailing }: TopBarProps) {
  return (
    <header className={styles['top-bar']}>
      {leading}
      {trailing}
    </header>
  )
}
