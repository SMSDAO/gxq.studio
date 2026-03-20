type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, unknown>

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap(input => {
      if (!input) return []
      if (typeof input === 'string') return [input]
      if (typeof input === 'number') return [String(input)]
      if (Array.isArray(input)) return [cn(...input)]
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k)
      }
      return []
    })
    .filter(Boolean)
    .join(' ')
}

export function formatAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
}

export function timeAgo(date: Date | string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
