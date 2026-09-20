import { useTranslation } from 'react-i18next'

import { MatchAvailabilityBadge } from '@/modules/matches/components/MatchAvailabilityBadge/MatchAvailabilityBadge'
import type { MatchAvailability, Venue } from '@/modules/matches/types/match'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import { ICON_NAME } from '@/shared/constants/icons'
import styles from './MatchTitleBlock.module.scss'

interface MatchTitleBlockProps {
  title: string
  venue: Venue
  availability: MatchAvailability
  remainingSlots: number
}

export function MatchTitleBlock({ title, venue, availability, remainingSlots }: MatchTitleBlockProps) {
  const { t } = useTranslation()

  return (
    <div className={styles['match-title-block']}>
      <div className={styles['match-title-block__text']}>
        <h1 className={styles['match-title-block__title']}>{title}</h1>
        <p className={styles['match-title-block__venue']}>
          <Icon name={ICON_NAME.PIN} />
          <span>{t('MATCHES.DETAIL.VENUE_LABEL', { name: venue.name, city: venue.city })}</span>
        </p>
      </div>
      <MatchAvailabilityBadge
        availability={availability}
        remainingSlots={remainingSlots}
      />
    </div>
  )
}
