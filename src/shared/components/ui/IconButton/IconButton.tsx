import { Icon } from '@/shared/components/ui/Icon/Icon'
import type { IconName } from '@/shared/constants/icons'
import styles from './IconButton.module.scss'

interface IconButtonProps {
  icon: IconName
  label: string
  onClick: () => void
}

const ICON_BUTTON_ICON_SIZE = 18

export function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      className={styles['icon-button']}
      aria-label={label}
      onClick={onClick}
    >
      <Icon
        name={icon}
        size={ICON_BUTTON_ICON_SIZE}
      />
    </button>
  )
}
