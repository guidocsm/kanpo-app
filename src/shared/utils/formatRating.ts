const RATING_FORMATTER = new Intl.NumberFormat('es-VE', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
})

// 4.9 → "4,9"
export function formatRating(rating: number): string {
  return RATING_FORMATTER.format(rating)
}
