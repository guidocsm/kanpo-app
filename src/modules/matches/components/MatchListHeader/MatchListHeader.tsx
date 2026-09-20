import { useTranslation } from 'react-i18next'

import { formatDayLabel } from '@/shared/utils/formatDate'
import styles from './MatchListHeader.module.scss'

interface MatchListHeaderProps {
  selectedDate: Date
  matchCount: number
  onFilterClick: () => void
}

export function MatchListHeader({ selectedDate, matchCount, onFilterClick }: MatchListHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className={styles['match-list-header']}>
      <h2 className={styles['match-list-header__summary']}>{t('MATCHES.LIST.SUMMARY', { day: formatDayLabel(selectedDate), count: matchCount })}</h2>
      <button
        type="button"
        className={styles['match-list-header__filter']}
        onClick={onFilterClick}
      >
        {t('FEED.FILTER')}
      </button>
    </div>
  )
}
