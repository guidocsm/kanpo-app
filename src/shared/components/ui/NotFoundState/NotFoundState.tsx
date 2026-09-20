import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { EmptyState } from '@/shared/components/ui/EmptyState/EmptyState'
import { ICON_NAME } from '@/shared/constants/icons'
import { ROUTES } from '@/shared/constants/routes'

export function NotFoundState() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBackToFeedClick = () => navigate(ROUTES.FEED, { replace: true })

  return (
    <EmptyState
      icon={ICON_NAME.BALL}
      title={t('COMMON.NOT_FOUND.TITLE')}
      description={t('COMMON.NOT_FOUND.DESCRIPTION')}
      actionLabel={t('COMMON.NOT_FOUND.BACK_TO_FEED_BUTTON')}
      onAction={handleBackToFeedClick}
    />
  )
}
