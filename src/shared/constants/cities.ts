import type { City } from '@/shared/types/city'

export const CITY = {
  CARACAS: 'ccs',
  MARACAIBO: 'mbo',
  VALENCIA: 'vlc'
} as const satisfies Record<string, City>

export const CITY_TRANSLATION_KEY: Record<City, string> = {
  [CITY.CARACAS]: 'COMMON.CITIES.CCS',
  [CITY.MARACAIBO]: 'COMMON.CITIES.MBO',
  [CITY.VALENCIA]: 'COMMON.CITIES.VLC'
}

// Fase 1: solo Caracas. Sustituir por el selector de ciudad o la geolocalización cuando existan.
export const DEFAULT_CITY: City = CITY.CARACAS
