import { Trans, useTranslation } from 'react-i18next'

import { getWeekLabelValues } from '@/shared/utils/formatDate'
import styles from './FeedGreeting.module.scss'

interface FeedGreetingProps {
  firstName: string
  selectedDate: Date
}

export function FeedGreeting({ firstName, selectedDate }: FeedGreetingProps) {
  const { t } = useTranslation()

  return (
    <div className={styles['feed-greeting']}>
      <p className={styles['feed-greeting__week']}>{t('FEED.WEEK_LABEL', getWeekLabelValues(selectedDate))}</p>
      <h1 className={styles['feed-greeting__title']}>
        <Trans
          i18nKey="FEED.GREETING"
          values={{ name: firstName }}
          components={{ br: <br />, accent: <span className={styles['feed-greeting__accent']} /> }}
        />
      </h1>
    </div>
  )
}
