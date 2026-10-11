const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

const inrWhole = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return Number.isInteger(value) ? inrWhole.format(value) : inr.format(value)
}

/** Currency-only name used across checkout, orders and confirmation. */
export function formatCurrency(value: number): string {
  return formatPrice(value)
}

const orderDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

export function formatOrderDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return orderDateFormatter.format(date)
}

export function formatOrderDateShort(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const short = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return short.format(date)
}

/** Human label for a saved order's payment method. */
export function paymentMethodLabel(method: string): string {
  return method === 'cod' ? 'Cash on Delivery' : 'Online (simulated)'
}

/** Compact one-line payment state for order history / details. */
export function priceStateLabel(method: string, status: string): string {
  if (method === 'cod') return 'Cash on delivery'
  if (status === 'succeeded') return 'Paid (simulated)'
  if (status === 'failed') return 'Payment simulation failed'
  return 'Payment pending'
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}