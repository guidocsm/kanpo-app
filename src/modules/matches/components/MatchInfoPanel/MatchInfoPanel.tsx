import { useTranslation } from 'react-i18next'

import type { MatchDetail } from '@/modules/matches/types/match'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import { InfoRow } from '@/shared/components/ui/InfoRow/InfoRow'
import { ICON_NAME } from '@/shared/constants/icons'
import { formatLongDayLabel, formatMatchTimeRange } from '@/shared/utils/formatDate'

interface MatchInfoPanelProps {
  match: MatchDetail
}

export function MatchInfoPanel({ match }: MatchInfoPanelProps) {
  const { t } = useTranslation()

  return (
    <div>
      <InfoRow leading={<Icon name={ICON_NAME.PIN} />}>{match.venue.address}</InfoRow>
      <InfoRow leading={<Icon name={ICON_NAME.CLOCK} />}>
        {t('MATCHES.DETAIL.INFO.SCHEDULE', { day: formatLongDayLabel(match.startsAt), timeRange: formatMatchTimeRange(match.startsAt, match.durationMinutes) })}
      </InfoRow>
    </div>
  )
}
