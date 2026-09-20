import styles from './DayPill.module.scss'

interface DayPillProps {
  dayNumber: string
  weekdayLabel: string
  isSelected: boolean
  hasIndicator: boolean
  onSelect: () => void
}

export function DayPill({ dayNumber, weekdayLabel, isSelected, hasIndicator, onSelect }: DayPillProps) {
  const selectedClassName = isSelected ? styles['day-pill--selected'] : ''
  const indicatorClassName = hasIndicator ? styles['day-pill__indicator--visible'] : ''

  return (
    <button
      type="button"
      className={`${styles['day-pill']} ${selectedClassName}`}
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className={styles['day-pill__number']}>{dayNumber}</span>
      <span className={styles['day-pill__weekday']}>{weekdayLabel}</span>
      <span
        className={`${styles['day-pill__indicator']} ${indicatorClassName}`}
        aria-hidden="true"
      />
    </button>
  )
}
