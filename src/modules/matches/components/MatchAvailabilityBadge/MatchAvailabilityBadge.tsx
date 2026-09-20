import { useTranslation } from 'react-i18next'

import { MATCH_AVAILABILITY } from '@/modules/matches/constants'
import type { MatchAvailability } from '@/modules/matches/types/match'
import { Badge } from '@/shared/components/ui/Badge/Badge'

interface MatchAvailabilityBadgeProps {
  availability: MatchAvailability
  remainingSlots: number
}

export function MatchAvailabilityBadge({ availability, remainingSlots }: MatchAvailabilityBadgeProps) {
  const { t } = useTranslation()

  if (availability === MATCH_AVAILABILITY.FEW_SLOTS) {
    return <Badge tone="warning">{t('MATCHES.DETAIL.AVAILABILITY.FEW_SLOTS_BADGE', { count: remainingSlots })}</Badge>
  }

  if (availability === MATCH_AVAILABILITY.FULL) {
    return <Badge tone="danger">{t('MATCHES.DETAIL.AVAILABILITY.FULL_BADGE')}</Badge>
  }

  return null
}
