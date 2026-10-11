export interface Category {
  slug: string
  name: string
  image: string
  alt: string
  description: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  categorySlug: string
  image: string
  alt: string
  unit: string
  price: number
  /** Only shown when backed by verified store data. */
  originalPrice?: number
  description: string
  /** Demo catalogue entry — price not yet confirmed by the store. */
  isDemo: boolean
  inStock: boolean
  popular?: boolean
  tags?: string[]
}

export interface CartItem {
  productId: string
  quantity: number
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name'

export interface DeliveryPoint {
  locality: string
  pin: string
}

/** Delivery address entered at checkout. All fields except landmark are required. */
export interface DeliveryAddress {
  fullName: string
  mobile: string
  house: string
  street: string
  city: string
  state: string
  pin: string
  landmark?: string
}

/** A delivery method shown at checkout. Fees come from the delivery config. */
export interface DeliveryOption {
  id: string
  label: string
  description: string
  /** Base fee before the free-delivery rule applies. */
  fee: number
}

export type PaymentMethod = 'cod' | 'online'

/** Tracks the state of the purely simulated payment step. */
export type MockPaymentStatus = 'pending' | 'succeeded' | 'failed'

/** Immutable snapshot of a purchased line, captured at order time. */
export interface OrderItemSnapshot {
  productId: string
  name: string
  brand: string
  unit: string
  image: string
  price: number
  quantity: number
  lineTotal: number
}

/** A frontend-only demonstration order. Never sent to any backend. */
export interface MockOrder {
  id: string
  createdAt: string
  items: OrderItemSnapshot[]
  deliveryAddress: DeliveryAddress
  deliveryOptionId: string
  deliveryInstructions?: string
  paymentMethod: PaymentMethod
  paymentStatus: MockPaymentStatus
  isDemo: true
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
}

export interface CheckoutFormData {
  deliveryAddress: DeliveryAddress
  deliveryOptionId: string
  deliveryInstructions: string
  paymentMethod: PaymentMethod | null
}

/** Single source of truth for every price shown across cart/checkout/confirmation. */
export interface PricingBreakdown {
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
}

export interface ToastMessage {
  id: string
  title: string
  description?: string
  tone: 'success' | 'error' | 'info'
}