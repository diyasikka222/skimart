import type { ReactNode } from 'react'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { StateMessage } from '@/components/ui/StateMessage'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  children?: ReactNode
}

export function ProductGrid({
  products,
  loading = false,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your search or browse another category.',
  children,
}: ProductGridProps) {
  if (loading) {
    return (
      <StateMessage
        type="loading"
        title="Loading products…"
      />
    )
  }

  if (products.length === 0) {
    return (
      <StateMessage
        type="empty"
        title={emptyTitle}
        description={emptyDescription}
        action={children}
      />
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}