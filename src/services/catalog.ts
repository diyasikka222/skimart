import type { Category, Product, SortOption } from '@/types'
import { categories } from '@/data/categories'
import { products } from '@/data/products'

/**
 * Catalogue service layer.
 *
 * The UI talks only to these functions. Swap the implementations for API calls
 * later without touching components.
 */

function asCategory(category: Category): Category & { itemCount: number } {
  const itemCount = products.filter((p) => p.categorySlug === category.slug).length
  return { ...category, itemCount }
}

export function getCategories(): (Category & { itemCount: number })[] {
  return categories.map(asCategory)
}

export function getCategory(slug: string): (Category & { itemCount: number }) | undefined {
  const category = categories.find((c) => c.slug === slug)
  return category ? asCategory(category) : undefined
}

export function getProducts(): Product[] {
  return products
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getPopularProducts(count = 8): Product[] {
  const popular = products.filter((p) => p.popular).slice(0, count)
  return popular.length > 0 ? popular : products.slice(0, count)
}

export function getProductsByCategory(
  categorySlug: string,
): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  const same = getProductsByCategory(product.categorySlug).filter(
    (p) => p.id !== product.id,
  )
  if (same.length >= count) return same.slice(0, count)
  const others = products.filter(
    (p) => p.id !== product.id && p.categorySlug !== product.categorySlug && p.popular,
  )
  return [...same, ...others].slice(0, count)
}

export interface SearchQuery {
  q: string
  categorySlug?: string
}

export function searchProductsQuery(query: SearchQuery): Product[] {
  const needle = query.q.trim().toLowerCase()
  let results = products

  if (query.categorySlug) {
    results = results.filter((p) => p.categorySlug === query.categorySlug)
  }

  if (needle.length === 0) return results

  return results.filter((p) => {
    const category = getCategory(p.categorySlug)
    const haystack = [
      p.name,
      p.brand,
      p.description,
      p.unit,
      category?.name ?? '',
      ...(p.tags ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(needle)
  })
}

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const items = [...list]
  switch (sort) {
    case 'price-asc':
      return items.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return items.sort((a, b) => b.price - a.price)
    case 'name':
      return items.sort((a, b) => a.name.localeCompare(b.name))
    case 'popular':
    default:
      return items.sort(
        (a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)),
      )
  }
}

export function searchSuggestions(query: string, limit = 6): string[] {
  const needle = query.trim().toLowerCase()
  if (needle.length === 0) return []
  const set = new Set<string>()
  for (const p of products) {
    if (p.brand.toLowerCase().includes(needle)) set.add(p.brand)
    if (p.name.toLowerCase().includes(needle)) set.add(p.name)
    const cat = getCategory(p.categorySlug)
    if (cat && cat.name.toLowerCase().includes(needle)) set.add(cat.name)
    if (set.size >= limit) break
  }
  return [...set].slice(0, limit)
}