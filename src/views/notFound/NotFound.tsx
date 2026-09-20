import { NotFoundState } from '@/shared/components/ui/NotFoundState/NotFoundState'
import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <main className={styles['not-found']}>
      <NotFoundState />
    </main>
  )
}
