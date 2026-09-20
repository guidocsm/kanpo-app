import styles from './Avatar.module.scss'

interface AvatarProps {
  initials: string
  size?: 'sm' | 'lg'
}

export function Avatar({ initials, size = 'sm' }: AvatarProps) {
  return (
    <span
      className={`${styles['avatar']} ${styles[`avatar--${size}`]}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
