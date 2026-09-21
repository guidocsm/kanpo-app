import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { MATCH_AVAILABILITY } from '@/modules/matches/constants'
import type { Match } from '@/modules/matches/types/match'
import { getMatchAvailability } from '@/modules/matches/utils/getMatchAvailability'
import { Badge } from '@/shared/components/ui/Badge/Badge'
import { Card } from '@/shared/components/ui/Card/Card'
import { Chip } from '@/shared/components/ui/Chip/Chip'
import { Divider } from '@/shared/components/ui/Divider/Divider'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import { CITY_TRANSLATION_KEY } from '@/shared/constants/cities'
import { ICON_NAME } from '@/shared/constants/icons'
import { formatMatchTime } from '@/shared/utils/formatDate'
import { formatUsdAmount } from '@/shared/utils/formatUsdAmount'
import { getMatchDetailPath } from '@/shared/utils/routePaths'
import styles from './MatchCard.module.scss'

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const { t } = useTranslation()

  const isFull = getMatchAvailability(match) === MATCH_AVAILABILITY.FULL
  const areaLabel = match.venue.zone ?? t(CITY_TRANSLATION_KEY[match.venue.city])

  const spotsDotClassName = isFull ? styles['match-card__spots-dot--full'] : ''
  const priceClassName = isFull ? styles['match-card__price--muted'] : styles['match-card__price--accent']

  return (
    <Link
      to={getMatchDetailPath(match.id)}
      className={styles['match-card__link']}
    >
      <Card>
        <div className={styles['match-card']}>
          <div className={styles['match-card__header']}>
            <div>
              <p className={styles['match-card__time']}>{formatMatchTime(match.startsAt)}</p>
              <p className={styles['match-card__duration']}>{t('MATCHES.CARD.DURATION_MINUTES', { minutes: match.durationMinutes })}</p>
            </div>
            <div className={styles['match-card__info']}>
              <p className={styles['match-card__title']}>{match.venue.name}</p>
              <p className={styles['match-card__location']}>
                <span className={styles['match-card__location-name']}>{areaLabel}</span>
                <Icon name={ICON_NAME.PIN} />
              </p>
            </div>
          </div>

          <Divider />

          <div className={styles['match-card__footer']}>
            <div className={styles['match-card__meta']}>
              <Chip>{match.format}</Chip>
              <span className={styles['match-card__spots']}>
                <span className={`${styles['match-card__spots-dot']} ${spotsDotClassName}`} />
                {t('MATCHES.CARD.SPOTS', { occupied: match.occupiedSlots, total: match.totalSlots })}
              </span>
              {isFull && (
                <Badge
                  tone="danger"
                  size="sm"
                >
                  {t('MATCHES.CARD.FULL')}
                </Badge>
              )}
            </div>
            <p className={`${styles['match-card__price']} ${priceClassName}`}>{formatUsdAmount(match.priceUsd)}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
