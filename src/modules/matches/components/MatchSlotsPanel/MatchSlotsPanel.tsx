import { useTranslation } from 'react-i18next'

import type { MatchDetail } from '@/modules/matches/types/match'
import { getRemainingSlots } from '@/modules/matches/utils/getMatchAvailability'
import { StatRow } from '@/shared/components/ui/StatRow/StatRow'
import styles from './MatchSlotsPanel.module.scss'

interface MatchSlotsPanelProps {
  occupiedSlots: MatchDetail['occupiedSlots']
  totalSlots: MatchDetail['totalSlots']
}

export function MatchSlotsPanel({ occupiedSlots, totalSlots }: MatchSlotsPanelProps) {
  const { t } = useTranslation()

  return (
    <div className={styles['match-slots-panel']}>
      <StatRow
        items={[
          { label: t('MATCHES.DETAIL.SLOTS.OCCUPIED'), value: String(occupiedSlots) },
          { label: t('MATCHES.DETAIL.SLOTS.AVAILABLE'), value: String(getRemainingSlots({ totalSlots, occupiedSlots })) }
        ]}
      />
    </div>
  )
}
