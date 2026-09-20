import styles from './StatRow.module.scss'

interface StatRowItem {
  label: string
  value: string
}

interface StatRowProps {
  items: StatRowItem[]
}

export function StatRow({ items }: StatRowProps) {
  return (
    <dl className={styles['stat-row']}>
      {items.map((item) => (
        <div
          key={item.label}
          className={styles['stat-row__item']}
        >
          <dt className={styles['stat-row__label']}>{item.label}</dt>
          <dd className={styles['stat-row__value']}>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
