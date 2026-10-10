import { create } from 'zustand'
import { safeStorage, isRecordOfIdToQuantity } from '@/lib/safeStorage'
import { getProductById } from '@/services/catalog'
import type { CartItem } from '@/types'

const STORAGE_KEY = 'skimart.cart.v1'

type CartMap = Record<string, number> // productId -> quantity

interface CartState {
  items: CartMap
  add: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  remove: (productId: string) => void
  clear: () => void
}

/** Reject stale/invalid persisted data, keep only products that still exist. */
function sanitize(input: Record<string, number>): CartMap {
  const clean: CartMap = {}
  for (const [id, qty] of Object.entries(input)) {
    if (getProductById(id) && Number.isFinite(qty) && qty > 0) {
      clean[id] = Math.floor(qty)
    }
  }
  return clean
}

const initial = safeStorage.getValidated<Record<string, number>>(STORAGE_KEY, (v) =>
  isRecordOfIdToQuantity(v),
)

export const useCartStore = create<CartState>((set, get) => ({
  items: initial ? sanitize(initial) : {},

  add: (productId, quantity = 1) =>
    set((state) => {
      const next: CartMap = {
        ...state.items,
        [productId]: Math.max(1, (state.items[productId] ?? 0) + quantity),
      }
      safeStorage.setObject(STORAGE_KEY, next)
      return { items: next }
    }),

  setQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const next = { ...state.items }
        delete next[productId]
        safeStorage.setObject(STORAGE_KEY, next)
        return { items: next }
      }
      const next = { ...state.items, [productId]: quantity }
      safeStorage.setObject(STORAGE_KEY, next)
      return { items: next }
    }),

  increment: (productId) => get().setQuantity(productId, (get().items[productId] ?? 0) + 1),

  decrement: (productId) => {
    const current = get().items[productId] ?? 0
    if (current <= 1) get().remove(productId)
    else get().setQuantity(productId, current - 1)
  },

  remove: (productId) =>
    set((state) => {
      const next = { ...state.items }
      delete next[productId]
      safeStorage.setObject(STORAGE_KEY, next)
      return { items: next }
    }),

  clear: () => {
    safeStorage.remove(STORAGE_KEY)
    set({ items: {} })
  },
}))

export const selectCartItems: (state: CartState) => CartItem[] = (state) =>
  Object.entries(state.items).map(([productId, quantity]) => ({ productId, quantity }))

export const selectCartCount: (state: CartState) => number = (state) =>
  Object.values(state.items).reduce((sum, q) => sum + q, 0)

export const selectCartTotal: (state: CartState) => number = (state) =>
  Object.entries(state.items).reduce((sum, [id, q]) => {
    const product = getProductById(id)
    return sum + (product ? product.price * q : 0)
  }, 0)