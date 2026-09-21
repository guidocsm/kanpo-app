import type { City } from '@/shared/types/city'

export const CITY = {
  CARACAS: 'ccs',
  MARACAIBO: 'mbo',
  VALENCIA: 'vlc'
} as const satisfies Record<string, City>

// Fase 1: solo Caracas. Sustituir por el selector de ciudad o la geolocalización cuando existan.
export const DEFAULT_CITY: City = CITY.CARACAS
