import { parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import type { Match } from '@/modules/matches/types/match'
import { Badge } from '@/shared/components/ui/Badge/Badge'
import { Card } from '@/shared/components/ui/Card/Card'
import { Chip } from '@/shared/components/ui/Chip/Chip'
import { Divider } from '@/shared/components/ui/Divider/Divider'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import { RELATIVE_DAY, type RelativeDay } from '@/shared/constants/dates'
import { ICON_NAME } from '@/shared/constants/icons'
import { getRelativeDay } from '@/shared/utils/dateKey'
import { formatDayLabel, formatMatchTime } from '@/shared/utils/formatDate'
import { formatUsdAmount } from '@/shared/utils/formatUsdAmount'
import { getMatchDetailPath } from '@/shared/utils/routePaths'
import styles from './MatchCard.module.scss'

interface MatchCardProps {
  match: Match
  variant: 'featured' | 'default'
}

const RELATIVE_DAY_TRANSLATION_KEY: Record<RelativeDay, string> = {
  [RELATIVE_DAY.TODAY]: 'MATCHES.CARD.TODAY',
  [RELATIVE_DAY.TOMORROW]: 'MATCHES.CARD.TOMORROW'
}

export function MatchCard({ match, variant }: MatchCardProps) {
  const { t } = useTranslation()

  const isFeatured = variant === 'featured'
  const isFull = match.enrolledCount >= match.capacity
  const startDate = parseISO(match.startsAt)
  const relativeDay = getRelativeDay(startDate)
  const relativeDayLabel = relativeDay ? t(RELATIVE_DAY_TRANSLATION_KEY[relativeDay]) : formatDayLabel(startDate)
  const durationLabel = t('MATCHES.CARD.DURATION_MINUTES', { minutes: match.durationMinutes })

  const featuredClassName = isFeatured ? styles['match-card--featured'] : ''
  const spotsDotClassName = isFull ? styles['match-card__spots-dot--full'] : isFeatured ? styles['match-card__spots-dot--featured'] : ''
  const priceClassName = isFull ? styles['match-card__price--muted'] : isFeatured ? styles['match-card__price--featured'] : styles['match-card__price--accent']

  return (
    <Link
      to={getMatchDetailPath(match.id)}
      className={styles['match-card__link']}
    >
      <Card tone={isFeatured ? 'dark' : 'light'}>
        <div className={`${styles['match-card']} ${featuredClassName}`}>
          {isFeatured && (
            <div className={styles['match-card__badge']}>
              <Badge tone="highlight">{t('MATCHES.CARD.NEXT_MATCH')}</Badge>
            </div>
          )}

          <div className={styles['match-card__header']}>
            <div>
              <p className={styles['match-card__time']}>{formatMatchTime(match.startsAt)}</p>
              <p className={styles['match-card__duration']}>{isFeatured ? `${durationLabel} · ${relativeDayLabel}` : durationLabel}</p>
            </div>
            <div className={styles['match-card__info']}>
              <p className={styles['match-card__title']}>{match.title}</p>
              <p className={styles['match-card__location']}>
                <span className={styles['match-card__location-name']}>{match.venue.name}</span>
                <Icon name={ICON_NAME.PIN} />
              </p>
            </div>
          </div>

          <Divider tone={isFeatured ? 'dark' : 'light'} />

          <div className={styles['match-card__footer']}>
            <div className={styles['match-card__meta']}>
              <Chip tone={isFeatured ? 'onDark' : 'default'}>{match.format}</Chip>
              <span className={styles['match-card__spots']}>
                <span className={`${styles['match-card__spots-dot']} ${spotsDotClassName}`} />
                {t('MATCHES.CARD.SPOTS', { enrolled: match.enrolledCount, capacity: match.capacity })}
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
