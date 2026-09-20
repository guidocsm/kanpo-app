import { useTranslation } from 'react-i18next'

import type { MatchDaySummary } from '@/modules/matches/types/match'
import { DayPill } from '@/shared/components/ui/DayPill/DayPill'
import { parseDateKey } from '@/shared/utils/dateKey'
import { formatDayNumber, formatWeekdayShort } from '@/shared/utils/formatDate'
import styles from './MatchDaySelector.module.scss'

interface MatchDaySelectorProps {
  days: MatchDaySummary[]
  selectedDateKey: string
  onSelectDate: (dateKey: string) => void
}

export function MatchDaySelector({ days, selectedDateKey, onSelectDate }: MatchDaySelectorProps) {
  const { t } = useTranslation()

  return (
    <div
      className={styles['match-day-selector']}
      role="group"
      aria-label={t('MATCHES.DAY_SELECTOR_LABEL')}
    >
      {days.map((day) => {
        const date = parseDateKey(day.dateKey)

        return (
          <DayPill
            key={day.dateKey}
            dayNumber={formatDayNumber(date)}
            weekdayLabel={formatWeekdayShort(date)}
            isSelected={day.dateKey === selectedDateKey}
            hasIndicator={day.matchCount > 0}
            onSelect={() => onSelectDate(day.dateKey)}
          />
        )
      })}
    </div>
  )
}
