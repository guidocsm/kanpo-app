import { useTranslation } from 'react-i18next'

import styles from './BrandLogo.module.scss'

const BRAND_MARK = 'k'
const BRAND_DOT = '.'

export function BrandLogo() {
  const { t } = useTranslation()

  return (
    <div className={styles['brand-logo']}>
      <span
        className={styles['brand-logo__mark']}
        aria-hidden="true"
      >
        {BRAND_MARK}
      </span>
      <span className={styles['brand-logo__name']}>
        {t('COMMON.BRAND')}
        <span className={styles['brand-logo__dot']}>{BRAND_DOT}</span>
      </span>
    </div>
  )
}
