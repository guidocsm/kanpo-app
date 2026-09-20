export const KANPO_COLORS = {
  // Neutrals
  CREAM: '#F4F1E8',
  IVORY: '#FAF8F2',
  SAND: '#E8E3D6',
  STONE: '#D9D3C3',
  WHITE: '#FFFFFF',

  // Ink
  FOREST_BLACK: '#0F1A14',
  FOREST_DARK: '#1C2A22',
  MOSS_GRAY: '#6B7268',
  SAGE_GRAY: '#9AA096',

  // Green
  GRASS: '#0E8A5F',
  GRASS_DARK: '#0A6E4B',
  GRASS_LIGHT: '#3FB07F',
  MINT: '#DCEFE3',
  FIELD: '#4E8F5C',

  // Gold
  OCHRE: '#C9A24A',
  OCHRE_LIGHT: '#F2E6C4',

  // Feedback
  CLAY_RED: '#C4492F',
  CLAY_RED_LIGHT: '#F6DDD6',
  AMBER: '#D98A1F',
  AMBER_LIGHT: '#FBEBD2',

  // Payment methods
  ZELLE_BLUE: '#1A5CFF',
  PAYPAL_NAVY: '#003087',
  TETHER_GREEN: '#26A17B',
  BINANCE_YELLOW: '#F3BA2F',
  PAGOMOVIL_BLACK: '#111111'
} as const

export type KanpoColor = (typeof KANPO_COLORS)[keyof typeof KANPO_COLORS]
