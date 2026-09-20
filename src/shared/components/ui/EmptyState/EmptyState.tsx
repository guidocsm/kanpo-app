import { Button } from '@/shared/components/ui/Button/Button'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import type { IconName } from '@/shared/constants/icons'
import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  icon: IconName
  title: string
  description: string
  actionLabel?: string
  actionIcon?: IconName
  onAction?: () => void
}

const EMPTY_STATE_ICON_SIZE = 56

export function EmptyState({ icon, title, description, actionLabel, actionIcon, onAction }: EmptyStateProps) {
  return (
    <div className={styles['empty-state']}>
      <div className={styles['empty-state__icon']}>
        <Icon
          name={icon}
          size={EMPTY_STATE_ICON_SIZE}
        />
      </div>
      <h2 className={styles['empty-state__title']}>{title}</h2>
      <p className={styles['empty-state__description']}>{description}</p>
      {actionLabel && (
        <Button
          leadingIcon={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
