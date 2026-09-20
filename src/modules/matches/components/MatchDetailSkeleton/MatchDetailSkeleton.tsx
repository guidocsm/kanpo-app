import { useTranslation } from 'react-i18next'

import { ActionBar } from '@/shared/components/ui/ActionBar/ActionBar'
import { Skeleton } from '@/shared/components/ui/Skeleton/Skeleton'
import styles from './MatchDetailSkeleton.module.scss'

const ICON_BUTTON_SKELETON_SIZE = 44
const HERO_SKELETON_HEIGHT = 150
const CTA_SKELETON_HEIGHT = 56
const INFO_ROW_SKELETON_KEYS = [0, 1, 2]

export function MatchDetailSkeleton() {
  const { t } = useTranslation()

  return (
    <div
      className={styles['match-detail-skeleton']}
      role="status"
      aria-busy="true"
      aria-label={t('MATCHES.DETAIL.LOADING_LABEL')}
    >
      <div className={styles['match-detail-skeleton__header']}>
        <Skeleton
          width={ICON_BUTTON_SKELETON_SIZE}
          height={ICON_BUTTON_SKELETON_SIZE}
          radius="full"
        />
        <Skeleton
          width={140}
          height={11}
        />
        <div className={styles['match-detail-skeleton__actions']}>
          <Skeleton
            width={ICON_BUTTON_SKELETON_SIZE}
            height={ICON_BUTTON_SKELETON_SIZE}
            radius="full"
          />
          <Skeleton
            width={ICON_BUTTON_SKELETON_SIZE}
            height={ICON_BUTTON_SKELETON_SIZE}
            radius="full"
          />
        </div>
      </div>

      <Skeleton
        height={HERO_SKELETON_HEIGHT}
        radius="lg"
      />

      <div className={styles['match-detail-skeleton__title']}>
        <Skeleton
          width={160}
          height={24}
        />
        <Skeleton
          width={130}
          height={12}
        />
      </div>

      <div className={styles['match-detail-skeleton__specs']}>
        {INFO_ROW_SKELETON_KEYS.map((specIndex) => (
          <div
            key={specIndex}
            className={styles['match-detail-skeleton__spec']}
          >
            <Skeleton
              width={56}
              height={11}
            />
            <Skeleton
              width={80}
              height={16}
            />
          </div>
        ))}
      </div>

      <div className={styles['match-detail-skeleton__tabs']}>
        <Skeleton
          width={90}
          height={12}
        />
        <Skeleton
          width={110}
          height={12}
        />
        <Skeleton
          width={50}
          height={12}
        />
      </div>

      <div className={styles['match-detail-skeleton__rows']}>
        {INFO_ROW_SKELETON_KEYS.map((rowIndex) => (
          <div
            key={rowIndex}
            className={styles['match-detail-skeleton__row']}
          >
            <Skeleton
              width={ICON_BUTTON_SKELETON_SIZE}
              height={ICON_BUTTON_SKELETON_SIZE}
              radius="full"
            />
            <div className={styles['match-detail-skeleton__row-text']}>
              <Skeleton
                width="60%"
                height={16}
              />
              <Skeleton
                width="40%"
                height={11}
              />
            </div>
          </div>
        ))}
      </div>

      <ActionBar>
        <Skeleton
          height={CTA_SKELETON_HEIGHT}
          radius="lg"
        />
      </ActionBar>
    </div>
  )
}
