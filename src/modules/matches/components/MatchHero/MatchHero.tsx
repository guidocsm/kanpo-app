import { useState } from 'react'

import styles from './MatchHero.module.scss'

interface MatchHeroProps {
  photoUrl: string | null
}

// Foto de la cancha si existe; si no hay foto (o no carga), ilustración decorativa de cancha.
export function MatchHero({ photoUrl }: MatchHeroProps) {
  const [failedPhotoUrl, setFailedPhotoUrl] = useState<string | null>(null)

  const shouldShowPhoto = Boolean(photoUrl) && photoUrl !== failedPhotoUrl

  return (
    <div
      className={styles['match-hero']}
      aria-hidden="true"
    >
      {shouldShowPhoto ? (
        <img
          className={styles['match-hero__photo']}
          src={photoUrl ?? undefined}
          alt=""
          onError={() => setFailedPhotoUrl(photoUrl)}
        />
      ) : (
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
      )}
    </div>
  )
}
