const USD_FORMATTER = new Intl.NumberFormat('es-VE', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol'
})

export function formatUsdAmount(amount: number): string {
  return USD_FORMATTER.format(amount)
}
