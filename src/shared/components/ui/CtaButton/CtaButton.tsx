import { Icon } from '@/shared/components/ui/Icon/Icon'
import type { IconName } from '@/shared/constants/icons'
import styles from './CtaButton.module.scss'

interface CtaButtonProps {
  label: string
  sublabel: string
  chipLabel?: string
  chipIcon?: IconName
  isDisabled?: boolean
  onClick?: () => void
}

export function CtaButton({ label, sublabel, chipLabel, chipIcon, isDisabled = false, onClick }: CtaButtonProps) {
  const disabledClassName = isDisabled ? styles['cta-button--disabled'] : ''

  return (
    <button
      type="button"
      className={`${styles['cta-button']} ${disabledClassName}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className={styles['cta-button__text']}>
        <span className={styles['cta-button__label']}>{label}</span>
        <span className={styles['cta-button__sublabel']}>{sublabel}</span>
      </span>
      {(chipLabel || chipIcon) && (
        <span className={styles['cta-button__chip']}>
          {chipLabel && <span>{chipLabel}</span>}
          {chipIcon && <Icon name={chipIcon} />}
        </span>
      )}
    </button>
  )
}
