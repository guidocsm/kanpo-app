import { useTranslation } from 'react-i18next'

import type { MatchDetail } from '@/modules/matches/types/match'
import { EmptyState } from '@/shared/components/ui/EmptyState/EmptyState'
import { ICON_NAME } from '@/shared/constants/icons'
import styles from './MatchRulesPanel.module.scss'

interface MatchRulesPanelProps {
  rules: MatchDetail['rules']
}

export function MatchRulesPanel({ rules }: MatchRulesPanelProps) {
  const { t } = useTranslation()

  if (!rules?.trim()) {
    return (
      <EmptyState
        icon={ICON_NAME.BALL}
        title={t('MATCHES.DETAIL.RULES.EMPTY')}
      />
    )
  }

  return <p className={styles['match-rules-panel__text']}>{rules}</p>
}
