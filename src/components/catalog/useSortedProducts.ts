import { useState } from 'react'
import type { SortOption } from '@/types'
import { getProductsByCategory, sortProducts } from '@/services/catalog'

export function useSortedProducts(categorySlug: string) {
  const [sort, setSort] = useState<SortOption>('popular')
  const items = sortProducts(getProductsByCategory(categorySlug), sort)
  return { items, sort, setSort }
}