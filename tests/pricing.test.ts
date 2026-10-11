import { describe, expect, it } from 'vitest'
import {
  calculateCartTotals,
  calculateLineTotal,
  calculateSubtotal,
  getDeliveryFee,
  isDeliveryFree,
  resolveCartLines,
} from '@/lib/pricing'
import type { CartItem } from '@/types'

const milkItem: CartItem = { productId: 'p-001', quantity: 2 } // ₹27 each
const attaItem: CartItem = { productId: 'p-002', quantity: 1 } // ₹285 each

describe('cart subtotal', () => {
  it('calculates the sum of line totals', () => {
    expect(calculateSubtotal([milkItem, attaItem])).toBe(27 * 2 + 285)
  })

  it('returns zero for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it('calculates a single line total as price × quantity', () => {
    expect(calculateLineTotal('p-001', 3)).toBe(81)
    expect(calculateLineTotal('p-001', 0)).toBe(0)
  })
})

describe('delivery fee rules', () => {
  it('charges the standard fee below the threshold', () => {
    expect(getDeliveryFee(300)).toBe(30)
  })

  it('is free at the threshold', () => {
    expect(getDeliveryFee(499)).toBe(0)
  })

  it('is free above the threshold', () => {
    expect(getDeliveryFee(800)).toBe(0)
  })

  it('uses the selected option fee when applicable', () => {
    expect(getDeliveryFee(100, 'standard')).toBe(30)
  })

  it('reports free delivery correctly', () => {
    expect(isDeliveryFree(200)).toBe(false)
    expect(isDeliveryFree(499)).toBe(true)
    expect(isDeliveryFree(1000)).toBe(true)
  })
})

describe('total calculation', () => {
  it('adds delivery fee for orders below the threshold', () => {
    const totals = calculateCartTotals([milkItem])
    expect(totals.subtotal).toBe(54)
    expect(totals.deliveryFee).toBe(30)
    expect(totals.discount).toBe(0)
    expect(totals.total).toBe(84)
  })

  it('waives the delivery fee above the threshold', () => {
    const totals = calculateCartTotals([attaItem])
    expect(totals.subtotal).toBe(285)
    expect(totals.total).toBe(315)
  })

  it('uses the same utility shape everywhere', () => {
    expect(calculateCartTotals([milkItem, attaItem])).toEqual({
      subtotal: 339,
      deliveryFee: 30,
      discount: 0,
      total: 369,
    })
  })
})

describe('resolveCartLines', () => {
  it('returns a line per known product with line totals', () => {
    const lines = resolveCartLines([milkItem, { productId: 'p-099-does-not-exist', quantity: 5 }])
    expect(lines).toHaveLength(1)
    expect(lines[0].product.id).toBe('p-001')
    expect(lines[0].quantity).toBe(2)
    expect(lines[0].lineTotal).toBe(54)
  })
})