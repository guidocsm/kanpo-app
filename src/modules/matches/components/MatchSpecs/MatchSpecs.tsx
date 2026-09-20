import { useTranslation } from 'react-i18next'

import { MATCH_LEVEL, MATCH_SURFACE } from '@/modules/matches/constants'
import type { MatchFormat, MatchLevel, MatchSurface } from '@/modules/matches/types/match'
import { StatRow } from '@/shared/components/ui/StatRow/StatRow'

interface MatchSpecsProps {
  format: MatchFormat
  durationMinutes: number
  surface: MatchSurface
  level: MatchLevel
}

const SURFACE_TRANSLATION_KEY: Record<MatchSurface, string> = {
  [MATCH_SURFACE.SYNTHETIC]: 'MATCHES.DETAIL.SURFACE.SYNTHETIC'
}

const LEVEL_TRANSLATION_KEY: Record<MatchLevel, string> = {
  [MATCH_LEVEL.MIXED]: 'MATCHES.DETAIL.LEVEL.MIXED'
}

export function MatchSpecs({ format, durationMinutes, surface, level }: MatchSpecsProps) {
  const { t } = useTranslation()

  return (
    <StatRow
      items={[
        { label: t('MATCHES.DETAIL.SPECS.FORMAT'), value: t('MATCHES.DETAIL.SPECS.FORMAT_VALUE', { format, minutes: durationMinutes }) },
        { label: t('MATCHES.DETAIL.SPECS.SURFACE'), value: t(SURFACE_TRANSLATION_KEY[surface]) },
        { label: t('MATCHES.DETAIL.SPECS.LEVEL'), value: t(LEVEL_TRANSLATION_KEY[level]) }
      ]}
    />
  )
}
