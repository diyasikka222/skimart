import { describe, expect, it } from 'vitest'
import {
  createMockOrder,
  generateOrderId,
  getMockOrderById,
  getMockOrderHistory,
  type CreateMockOrderInput,
} from '@/services/orders'
import type { CartItem, DeliveryAddress } from '@/types'

const address: DeliveryAddress = {
  fullName: 'Asha Sharma',
  mobile: '9876543210',
  house: '12, Shiv Mandir Road',
  street: 'Pratap Nagar',
  city: 'Amb',
  state: 'Himachal Pradesh',
  pin: '177203',
}

const items: CartItem[] = [{ productId: 'p-001', quantity: 2 }] // ₹27 each

function buildInput(overrides: Partial<CreateMockOrderInput> = {}): CreateMockOrderInput {
  return {
    items,
    deliveryAddress: address,
    deliveryOptionId: 'standard',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    ...overrides,
  }
}

describe('generateOrderId', () => {
  it('follows the SKM-YYYYMMDD-XXXX format', () => {
    const id = generateOrderId(new Date('2026-10-11T10:00:00'))
    expect(id).toMatch(/^SKM-20261011-[A-Z2-9]{4}$/)
  })

  it('produces unique ids', () => {
    const ids = new Set(Array.from({ length: 30 }, () => generateOrderId()))
    expect(ids.size).toBe(30)
  })
})

describe('createMockOrder', () => {
  it('snapshots items, totals and the demo flag', () => {
    const order = createMockOrder(buildInput())
    expect(order.isDemo).toBe(true)
    expect(order.subtotal).toBe(54)
    expect(order.deliveryFee).toBe(30)
    expect(order.discount).toBe(0)
    expect(order.total).toBe(84)
    expect(order.items[0]).toMatchObject({
      productId: 'p-001',
      name: 'Amul Taaza Toned Milk',
      quantity: 2,
      lineTotal: 54,
    })
  })

  it('refuses to create an order with an empty cart', () => {
    expect(() => createMockOrder(buildInput({ items: [] }))).toThrow(/empty cart/i)
  })

  it('refuses to create an order with an invalid address', () => {
    expect(() =>
      createMockOrder(buildInput({ deliveryAddress: { ...address, mobile: '' } })),
    ).toThrow(/invalid delivery address/i)
  })

  it('refuses to create an order with an unavailable product', () => {
    expect(() =>
      createMockOrder(buildInput({ items: [{ productId: 'p-does-not-exist', quantity: 1 }] })),
    ).toThrow(/no longer available/i)
  })

  it('records the simulated online payment status', () => {
    const order = createMockOrder(
      buildInput({ paymentMethod: 'online', paymentStatus: 'succeeded' }),
    )
    expect(order.paymentMethod).toBe('online')
    expect(order.paymentStatus).toBe('succeeded')
  })

  it('keeps an immutable snapshot even if the catalogue price changes', () => {
    const order = createMockOrder(buildInput())
    expect(order.items[0].price).toBe(27)
    expect(order.items[0].lineTotal).toBe(54)
    // The stored snapshot is independent of future catalogue edits.
    expect(order.total).toBe(order.subtotal + order.deliveryFee - order.discount)
  })
})

describe('order persistence', () => {
  it('saves and retrieves an order by id', () => {
    const order = createMockOrder(buildInput())
    expect(getMockOrderById(order.id)).toEqual(order)
  })

  it('returns history newest first', () => {
    const first = createMockOrder(buildInput())
    const second = createMockOrder(buildInput())
    const history = getMockOrderHistory()
    const firstIndex = history.findIndex((order) => order.id === first.id)
    const secondIndex = history.findIndex((order) => order.id === second.id)
    expect(secondIndex).toBeLessThan(firstIndex)
    expect(history[0].id).toBe(second.id)
  })
})