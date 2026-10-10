import { create } from 'zustand'
import { safeStorage, isStringArray } from '@/lib/safeStorage'
import { getProductById } from '@/services/catalog'

const STORAGE_KEY = 'skimart.favourites.v1'

interface FavouritesState {
  ids: string[]
  toggle: (productId: string) => void
  isFavourite: (productId: string) => boolean
}

const stored = safeStorage.getObject<string[]>(STORAGE_KEY)
const initial = Array.isArray(stored) && isStringArray(stored) ? stored : []
const seeded = initial.filter((id) => getProductById(id))

export const useFavouritesStore = create<FavouritesState>((set, get) => ({
  ids: seeded,

  toggle: (productId) =>
    set((state) => {
      const next = state.ids.includes(productId)
        ? state.ids.filter((id) => id !== productId)
        : [...state.ids, productId]
      safeStorage.setObject(STORAGE_KEY, next)
      return { ids: next }
    }),

  isFavourite: (productId) => get().ids.includes(productId),
}))