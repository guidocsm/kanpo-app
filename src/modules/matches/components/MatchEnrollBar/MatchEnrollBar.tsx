import { useTranslation } from 'react-i18next'

import { MATCH_AVAILABILITY } from '@/modules/matches/constants'
import type { MatchDetail } from '@/modules/matches/types/match'
import { getMatchAvailability, getRemainingSlots } from '@/modules/matches/utils/getMatchAvailability'
import { ActionBar } from '@/shared/components/ui/ActionBar/ActionBar'
import { CtaButton } from '@/shared/components/ui/CtaButton/CtaButton'
import { TextButton } from '@/shared/components/ui/TextButton/TextButton'
import { ICON_NAME } from '@/shared/constants/icons'
import { formatUsdAmount } from '@/shared/utils/formatUsdAmount'
import styles from './MatchEnrollBar.module.scss'

interface MatchEnrollBarProps {
  match: MatchDetail
  onEnrollClick: () => void
  onWaitlistClick: () => void
}

export function MatchEnrollBar({ match, onEnrollClick, onWaitlistClick }: MatchEnrollBarProps) {
  const { t } = useTranslation()

  const availability = getMatchAvailability(match)
  const remainingSlots = getRemainingSlots(match)

  if (availability === MATCH_AVAILABILITY.FULL) {
    return (
      <ActionBar>
        <CtaButton
          isDisabled
          label={t('MATCHES.DETAIL.CTA.FULL_LABEL')}
          sublabel={t('MATCHES.DETAIL.CTA.FULL_HINT')}
          chipIcon={ICON_NAME.CLOCK}
        />
        <div className={styles['match-enroll-bar__waitlist']}>
          <TextButton onClick={onWaitlistClick}>{t('MATCHES.DETAIL.CTA.WAITLIST')}</TextButton>
        </div>
      </ActionBar>
    )
  }

  return (
    <ActionBar>
      {availability === MATCH_AVAILABILITY.FEW_SLOTS && <p className={styles['match-enroll-bar__notice']}>{t('MATCHES.DETAIL.CTA.FEW_SLOTS_NOTICE', { count: remainingSlots })}</p>}
      <CtaButton
        label={t('MATCHES.DETAIL.CTA.ENROLL')}
        sublabel={t('MATCHES.DETAIL.CTA.ENROLL_HINT')}
        chipLabel={formatUsdAmount(match.priceUsd)}
        chipIcon={ICON_NAME.ARROW_RIGHT}
        onClick={onEnrollClick}
      />
    </ActionBar>
  )
}
