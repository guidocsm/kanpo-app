import { useTranslation } from 'react-i18next'

import { MatchAvailabilityBadge } from '@/modules/matches/components/MatchAvailabilityBadge/MatchAvailabilityBadge'
import type { MatchAvailability, VenueDetail } from '@/modules/matches/types/match'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import { CITY_TRANSLATION_KEY } from '@/shared/constants/cities'
import { ICON_NAME } from '@/shared/constants/icons'
import styles from './MatchTitleBlock.module.scss'

interface MatchTitleBlockProps {
  venue: VenueDetail
  availability: MatchAvailability
  remainingSlots: number
}

export function MatchTitleBlock({ venue, availability, remainingSlots }: MatchTitleBlockProps) {
  const { t } = useTranslation()

  const cityName = t(CITY_TRANSLATION_KEY[venue.city])
  const areaLabel = venue.zone ? t('MATCHES.DETAIL.VENUE_LABEL', { zone: venue.zone, city: cityName }) : cityName

  return (
    <div className={styles['match-title-block']}>
      <div className={styles['match-title-block__text']}>
        <h1 className={styles['match-title-block__title']}>{venue.name}</h1>
        <p className={styles['match-title-block__venue']}>
          <Icon name={ICON_NAME.PIN} />
          <span>{areaLabel}</span>
        </p>
      </div>
      <MatchAvailabilityBadge
        availability={availability}
        remainingSlots={remainingSlots}
      />
    </div>
  )
}
