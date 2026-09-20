import { useTranslation } from 'react-i18next'

import { EmptyState } from '@/shared/components/ui/EmptyState/EmptyState'
import { ICON_NAME } from '@/shared/constants/icons'

interface NoMatchesStateProps {
  onNotifyClick: () => void
}

export function NoMatchesState({ onNotifyClick }: NoMatchesStateProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      icon={ICON_NAME.BALL}
      title={t('MATCHES.EMPTY.TITLE')}
      description={t('MATCHES.EMPTY.DESCRIPTION')}
      actionLabel={t('MATCHES.EMPTY.NOTIFY_BUTTON')}
      actionIcon={ICON_NAME.BELL}
      onAction={onNotifyClick}
    />
  )
}
