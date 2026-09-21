import { useTranslation } from 'react-i18next'

import { IconButton } from '@/shared/components/ui/IconButton/IconButton'
import { TopBar } from '@/shared/components/ui/TopBar/TopBar'
import { ICON_NAME } from '@/shared/constants/icons'
import styles from './MatchDetailHeader.module.scss'

interface MatchDetailHeaderProps {
  onBackClick: () => void
  onBookmarkClick: () => void
  onShareClick: () => void
}

export function MatchDetailHeader({ onBackClick, onBookmarkClick, onShareClick }: MatchDetailHeaderProps) {
  const { t } = useTranslation()

  return (
    <TopBar
      leading={
        <IconButton
          icon={ICON_NAME.CHEVRON_LEFT}
          label={t('MATCHES.DETAIL.HEADER.BACK_LABEL')}
          onClick={onBackClick}
        />
      }
      trailing={
        <div className={styles['match-detail-header__actions']}>
          <IconButton
            icon={ICON_NAME.BOOKMARK}
            label={t('MATCHES.DETAIL.HEADER.BOOKMARK_LABEL')}
            onClick={onBookmarkClick}
          />
          <IconButton
            icon={ICON_NAME.SHARE}
            label={t('MATCHES.DETAIL.HEADER.SHARE_LABEL')}
            onClick={onShareClick}
          />
        </div>
      }
    />
  )
}
