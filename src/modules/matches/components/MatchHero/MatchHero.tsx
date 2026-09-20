import styles from './MatchHero.module.scss'

// Ilustración decorativa de cancha (aún no hay fotos de la sede).
export function MatchHero() {
  return (
    <div
      className={styles['match-hero']}
      aria-hidden="true"
    >
      <svg
        className={styles['match-hero__pitch']}
        viewBox="0 0 350 150"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        focusable="false"
      >
        <circle
          cx="175"
          cy="75"
          r="34"
        />
        <line
          x1="175"
          y1="0"
          x2="175"
          y2="150"
        />
        <circle
          cx="175"
          cy="75"
          r="2.5"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
