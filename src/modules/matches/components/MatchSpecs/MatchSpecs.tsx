import { useTranslation } from 'react-i18next'

import type { MatchDetail } from '@/modules/matches/types/match'
import { StatRow } from '@/shared/components/ui/StatRow/StatRow'

interface MatchSpecsProps {
  format: MatchDetail['format']
  durationMinutes: MatchDetail['durationMinutes']
}

export function MatchSpecs({ format, durationMinutes }: MatchSpecsProps) {
  const { t } = useTranslation()

  return (
    <StatRow
      items={[
        { label: t('MATCHES.DETAIL.SPECS.FORMAT'), value: format },
        { label: t('MATCHES.DETAIL.SPECS.DURATION'), value: t('MATCHES.DETAIL.SPECS.DURATION_VALUE', { minutes: durationMinutes }) }
      ]}
    />
  )
}
