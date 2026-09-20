import type { ReactNode } from 'react'

import { Icon } from '@/shared/components/ui/Icon/Icon'
import type { IconName } from '@/shared/constants/icons'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  variant?: 'secondary'
  leadingIcon?: IconName
  onClick?: () => void
}

export function Button({ children, variant = 'secondary', leadingIcon, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles['button']} ${styles[`button--${variant}`]}`}
      onClick={onClick}
    >
      {leadingIcon && <Icon name={leadingIcon} />}
      <span>{children}</span>
    </button>
  )
}
