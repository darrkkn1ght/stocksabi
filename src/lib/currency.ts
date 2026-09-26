/**
 * Format a number as Nigerian Naira (NGN)
 * Example: 185000 -> ₦185,000
 */
export function formatNaira(amount: number, options?: { showDecimals?: boolean }): string {
  const showDecimals = options?.showDecimals ?? false
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount)
}
