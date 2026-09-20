const RATIO_PADDING_LENGTH = 2

// (4, 14) → "04/14"
export function formatCountRatio(current: number, total: number): string {
  return `${String(current).padStart(RATIO_PADDING_LENGTH, '0')}/${String(total).padStart(RATIO_PADDING_LENGTH, '0')}`
}
