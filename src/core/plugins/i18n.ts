import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from '@locales/es.json'

const DEFAULT_LANGUAGE = 'es'

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es }
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
