import type { CartItem, PricingBreakdown } from '@/types'
import type { Product } from '@/types'
import { getProductById } from '@/services/catalog'
import { deliveryConfig, getDeliveryOption } from '@/config/delivery'

/**
 * Single source of truth for every price shown across cart, checkout and
 * order confirmation. Components render values from these helpers only.
 */

export interface CartLine {
  product: Product
  quantity: number
  lineTotal: number
}

/** Resolves cart items against the current catalogue, skipping unknown products. */
export function resolveCartLines(items: CartItem[]): CartLine[] {
  const lines: CartLine[] = []
  for (const item of items) {
    const product = getProductById(item.productId)
    if (!product) continue
    lines.push({
      product,
      quantity: item.quantity,
      lineTotal: roundMoney(product.price * item.quantity),
    })
  }
  return lines
}

/** lineTotal = unitPrice × quantity for a single cart line. */
export function calculateLineTotal(productId: string, quantity: number): number {
  const product = getProductById(productId)
  return product ? roundMoney(product.price * quantity) : 0
}

export function calculateSubtotal(items: CartItem[]): number {
  return roundMoney(
    items.reduce((sum, item) => sum + calculateLineTotal(item.productId, item.quantity), 0),
  )
}

/** Delivery fee based on the configured rules and the chosen option. */
export function getDeliveryFee(subtotal: number, optionId = 'standard'): number {
  const threshold = deliveryConfig.freeDeliveryThreshold
  if (threshold !== null && subtotal >= threshold) return 0
  return getDeliveryOption(optionId)?.fee ?? deliveryConfig.standardFee
}

export function isDeliveryFree(subtotal: number): boolean {
  const threshold = deliveryConfig.freeDeliveryThreshold
  return threshold !== null && subtotal >= threshold
}

export function calculateCartTotals(
  items: CartItem[],
  optionId = 'standard',
): PricingBreakdown {
  const subtotal = calculateSubtotal(items)
  const deliveryFee = getDeliveryFee(subtotal, optionId)
  const discount = 0
  const total = roundMoney(subtotal + deliveryFee - discount)
  return { subtotal, deliveryFee, discount, total }
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}