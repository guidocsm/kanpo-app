import * as RadixTabs from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'

import styles from './Tabs.module.scss'

interface TabItem {
  value: string
  label: string
  count?: string
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  value: string
  onValueChange: (value: string) => void
  ariaLabel: string
}

export function Tabs({ items, value, onValueChange, ariaLabel }: TabsProps) {
  return (
    <RadixTabs.Root
      className={styles['tabs']}
      value={value}
      onValueChange={onValueChange}
    >
      <RadixTabs.List
        className={styles['tabs__list']}
        aria-label={ariaLabel}
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            className={styles['tabs__trigger']}
            value={item.value}
          >
            {item.label}
            {item.count && <span className={styles['tabs__count']}>{item.count}</span>}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          className={styles['tabs__content']}
          value={item.value}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
