import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MatchInfoPanel } from '@/modules/matches/components/MatchInfoPanel/MatchInfoPanel'
import { MATCH_DETAIL_TAB } from '@/modules/matches/constants'
import type { MatchDetail } from '@/modules/matches/types/match'
import { EmptyState } from '@/shared/components/ui/EmptyState/EmptyState'
import { Tabs } from '@/shared/components/ui/Tabs/Tabs'
import { ICON_NAME } from '@/shared/constants/icons'
import { formatCountRatio } from '@/shared/utils/formatCountRatio'
import { scrollElementToStart } from '@/shared/utils/scroll'

interface MatchDetailTabsProps {
  match: MatchDetail
}

export function MatchDetailTabs({ match }: MatchDetailTabsProps) {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState<string>(MATCH_DETAIL_TAB.INFO)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  // Al cambiar de tab se sube al inicio del bloque, dejando la barra de tabs visible arriba.
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)
    scrollElementToStart(tabsContainerRef.current)
  }

  return (
    <div ref={tabsContainerRef}>
      <Tabs
        ariaLabel={t('MATCHES.DETAIL.TABS.LABEL')}
        value={selectedTab}
        onValueChange={handleTabChange}
        items={[
          {
            value: MATCH_DETAIL_TAB.INFO,
            label: t('MATCHES.DETAIL.TABS.INFO'),
            content: <MatchInfoPanel match={match} />
          },
          {
            value: MATCH_DETAIL_TAB.PARTICIPANTS,
            label: t('MATCHES.DETAIL.TABS.PARTICIPANTS'),
            count: formatCountRatio(match.enrolledCount, match.capacity),
            content: (
              <EmptyState
                icon={ICON_NAME.BALL}
                title={t('MATCHES.DETAIL.EMPTY_TABS.PARTICIPANTS')}
              />
            )
          },
          {
            value: MATCH_DETAIL_TAB.RULES,
            label: t('MATCHES.DETAIL.TABS.RULES'),
            content: (
              <EmptyState
                icon={ICON_NAME.BALL}
                title={t('MATCHES.DETAIL.EMPTY_TABS.RULES')}
              />
            )
          }
        ]}
      />
    </div>
  )
}
