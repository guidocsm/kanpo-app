import { Avatar } from '@/shared/components/ui/Avatar/Avatar'
import { formatUsdAmount } from '@/shared/utils/formatUsdAmount'
import styles from './UserBalanceChip.module.scss'

interface UserBalanceChipProps {
  balanceUsd: number
  initials: string
}

export function UserBalanceChip({ balanceUsd, initials }: UserBalanceChipProps) {
  return (
    <div className={styles['user-balance-chip']}>
      <span className={styles['user-balance-chip__balance']}>{formatUsdAmount(balanceUsd)}</span>
      <Avatar initials={initials} />
    </div>
  )
}
