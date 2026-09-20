export const ROUTES = {
  FEED: '/',
  MATCH_DETAIL: '/partido/:matchId',
  NOT_FOUND: '*'
} as const

// Clave que react-router asigna a la primera entrada del historial (entrada directa, p. ej. desde un link de WhatsApp).
export const INITIAL_LOCATION_KEY = 'default'
