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

export interface ToastMessage {
  id: string
  title: string
  description?: string
  tone: 'success' | 'error' | 'info'
}