import type { ReactNode } from 'react'

import styles from './InfoRow.module.scss'

interface InfoRowProps {
  leading: ReactNode
  children: ReactNode
  trailing?: ReactNode
}

export function InfoRow({ leading, children, trailing }: InfoRowProps) {
  return (
    <div className={styles['info-row']}>
      <span className={styles['info-row__leading']}>{leading}</span>
      <div className={styles['info-row__content']}>{children}</div>
      {trailing && <span className={styles['info-row__trailing']}>{trailing}</span>}
    </div>
  )
}
