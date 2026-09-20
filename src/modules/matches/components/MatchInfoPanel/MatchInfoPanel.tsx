import { useTranslation } from 'react-i18next'

import type { MatchDetail } from '@/modules/matches/types/match'
import { Avatar } from '@/shared/components/ui/Avatar/Avatar'
import { Badge } from '@/shared/components/ui/Badge/Badge'
import { Icon } from '@/shared/components/ui/Icon/Icon'
import { InfoRow } from '@/shared/components/ui/InfoRow/InfoRow'
import { ICON_NAME } from '@/shared/constants/icons'
import { formatLongDayLabel, formatMatchTimeRange } from '@/shared/utils/formatDate'
import { formatRating } from '@/shared/utils/formatRating'
import { getInitials } from '@/shared/utils/getInitials'
import styles from './MatchInfoPanel.module.scss'

interface MatchInfoPanelProps {
  match: MatchDetail
}

const RATING_STAR_SIZE = 12

export function MatchInfoPanel({ match }: MatchInfoPanelProps) {
  const { t } = useTranslation()

  const { organizer, venue } = match

  return (
    <div className={styles['match-info-panel']}>
      <InfoRow
        leading={
          <Avatar
            initials={getInitials(organizer.fullName)}
            size="lg"
          />
        }
        trailing={
          <Badge tone="highlight">
            <Icon
              name={ICON_NAME.STAR}
              size={RATING_STAR_SIZE}
            />
            {formatRating(organizer.rating)}
          </Badge>
        }
      >
        <p className={styles['match-info-panel__organizer-name']}>{organizer.fullName}</p>
        <p className={styles['match-info-panel__organizer-role']}>{t('MATCHES.DETAIL.INFO.ORGANIZER_ROLE', { count: organizer.organizedMatchesCount })}</p>
      </InfoRow>

      <InfoRow leading={<Icon name={ICON_NAME.PIN} />}>{t('MATCHES.DETAIL.INFO.LOCATION', { venue: venue.name, city: venue.city, field: match.fieldName })}</InfoRow>

      <InfoRow leading={<Icon name={ICON_NAME.CLOCK} />}>
        {t('MATCHES.DETAIL.INFO.SCHEDULE', { day: formatLongDayLabel(match.startsAt), timeRange: formatMatchTimeRange(match.startsAt, match.durationMinutes) })}
      </InfoRow>

      {match.organizerNote && (
        <div className={styles['match-info-panel__note']}>
          <p className={styles['match-info-panel__note-label']}>{t('MATCHES.DETAIL.INFO.NOTE_LABEL')}</p>
          <p className={styles['match-info-panel__note-text']}>{match.organizerNote}</p>
        </div>
      )}
    </div>
  )
}
