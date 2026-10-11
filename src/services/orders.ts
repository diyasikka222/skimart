import type {
  CartItem,
  DeliveryAddress,
  MockOrder,
  MockPaymentStatus,
  OrderItemSnapshot,
  PaymentMethod,
} from '@/types'
import { safeStorage } from '@/lib/safeStorage'
import { getProductById } from '@/services/catalog'
import { calculateCartTotals } from '@/lib/pricing'
import { validateDeliveryAddress } from '@/lib/checkoutValidation'

/**
 * Mock order persistence.
 *
 * Orders are plain frontend records stored only in the browser via the same
 * validated localStorage wrapper the rest of the app uses. Nothing is ever sent
 * to a backend and no real payment is processed.
 */

const STORAGE_KEY = 'skimart.orders.v1'

const ID_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const VALID_PAYMENT_METHODS = ['cod', 'online'] as const
const VALID_PAYMENT_STATUSES = ['pending', 'succeeded', 'failed'] as const

function randomSegment(length = 4): string {
  let segment = ''
  for (let i = 0; i < length; i += 1) {
    segment += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)]
  }
  return segment
}

export function generateOrderId(now: Date = new Date()): string {
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')
  let id: string
  do {
    id = `SKM-${date}-${randomSegment()}`
  } while (getMockOrderById(id))
  return id
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

function isMockOrder(value: unknown): value is MockOrder {
  if (!isRecord(value)) return false
  if (!isNonEmptyString(value.id) || !isNonEmptyString(value.createdAt)) return false
  if (Number.isNaN(new Date(value.createdAt).getTime())) return false
  if (!Array.isArray(value.items)) return false
  const itemsOk = value.items.every((item) => {
    if (!isRecord(item)) return false
    return (
      isNonEmptyString(item.productId) &&
      isNonEmptyString(item.name) &&
      isFiniteNumber(item.price) &&
      isFiniteNumber(item.quantity) &&
      isFiniteNumber(item.lineTotal)
    )
  })
  if (!itemsOk) return false
  if (!isRecord(value.deliveryAddress)) return false
  if (!isNonEmptyString(value.deliveryAddress.fullName)) return false
  if (!isFiniteNumber(value.subtotal)) return false
  if (!isFiniteNumber(value.deliveryFee)) return false
  if (!isFiniteNumber(value.discount)) return false
  if (!isFiniteNumber(value.total)) return false
  if (
    !VALID_PAYMENT_METHODS.includes(value.paymentMethod as (typeof VALID_PAYMENT_METHODS)[number])
  )
    return false
  if (
    !VALID_PAYMENT_STATUSES.includes(
      value.paymentStatus as (typeof VALID_PAYMENT_STATUSES)[number],
    )
  )
    return false
  return value.isDemo === true
}

/** All saved orders, newest first. */
export function getMockOrderHistory(): MockOrder[] {
  const stored = safeStorage.getObject<unknown>(STORAGE_KEY)
  if (!Array.isArray(stored)) return []
  return stored
    .filter(isMockOrder)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getMockOrderById(orderId: string): MockOrder | undefined {
  return getMockOrderHistory().find((order) => order.id === orderId)
}

export function saveMockOrder(order: MockOrder): boolean {
  const history = getMockOrderHistory()
  const next = [order, ...history.filter((existing) => existing.id !== order.id)]
  safeStorage.setObject(STORAGE_KEY, next)
  return getMockOrderById(order.id) !== undefined
}

export interface CreateMockOrderInput {
  items: CartItem[]
  deliveryAddress: DeliveryAddress
  deliveryOptionId: string
  deliveryInstructions?: string
  paymentMethod: PaymentMethod
  paymentStatus: MockPaymentStatus
}

/** Builds an immutable snapshot from the current cart and persists it.
 *  Throws when the cart is empty, the address is invalid, or a product is gone. */
export function createMockOrder(input: CreateMockOrderInput): MockOrder {
  if (!input.items || input.items.length === 0) {
    throw new Error('Cannot create an order with an empty cart.')
  }
  if (Object.keys(validateDeliveryAddress(input.deliveryAddress)).length > 0) {
    throw new Error('Cannot create an order with an invalid delivery address.')
  }

  const snapshots: OrderItemSnapshot[] = input.items.map((item) => {
    const product = getProductById(item.productId)
    if (!product) {
      throw new Error(`A product in your cart is no longer available (${item.productId}).`)
    }
    return {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      unit: product.unit,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
      lineTotal: Math.round(product.price * item.quantity * 100) / 100,
    }
  })

  const totals = calculateCartTotals(input.items, input.deliveryOptionId)

  const order: MockOrder = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    items: snapshots,
    deliveryAddress: { ...input.deliveryAddress },
    deliveryOptionId: input.deliveryOptionId,
    deliveryInstructions: input.deliveryInstructions?.trim() || undefined,
    paymentMethod: input.paymentMethod,
    paymentStatus: input.paymentStatus,
    isDemo: true,
    subtotal: totals.subtotal,
    deliveryFee: totals.deliveryFee,
    discount: totals.discount,
    total: totals.total,
  }

  const saved = saveMockOrder(order)
  if (!saved) {
    throw new Error('Your order could not be saved on this device. Please try again.')
  }
  return order
}