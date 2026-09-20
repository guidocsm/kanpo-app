import styles from './Divider.module.scss'

interface DividerProps {
  tone?: 'light' | 'dark'
}

export function Divider({ tone = 'light' }: DividerProps) {
  return <hr className={`${styles['divider']} ${styles[`divider--${tone}`]}`} />
}
