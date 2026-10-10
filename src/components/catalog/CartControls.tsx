import type { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { AddToCartButton } from '@/components/ui/AddToCartButton'
import { QuantityControl } from '@/components/ui/QuantityControl'

interface CartControlsProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
}

/** Shows Add when the item is not in the cart, quantity stepper once added. */
export function CartControls({ product, size = 'md' }: CartControlsProps) {
  const quantity = useCartStore((s) => s.items[product.id] ?? 0)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)

  if (!product.inStock) {
    return (
      <div className="inline-flex h-10 w-full items-center justify-center rounded-control border border-line bg-surface-subtle text-sm font-medium text-ink-muted">
        Out of stock
      </div>
    )
  }

  if (quantity > 0) {
    return (
      <div className="flex w-full justify-center">
        <QuantityControl
          value={quantity}
          onDecrease={() => decrement(product.id)}
          onIncrease={() => increment(product.id)}
          size={size === 'lg' ? 'md' : 'sm'}
          label={`Quantity of ${product.name}`}
        />
      </div>
    )
  }

  return <AddToCartButton product={product} size={size === 'sm' ? 'sm' : 'md'} />
}