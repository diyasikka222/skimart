import { ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotal,
  useCartStore,
} from '@/store/cartStore'
import { getProductById } from '@/services/catalog'
import { formatPrice } from '@/lib/format'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { QuantityControl } from '@/components/ui/QuantityControl'
import { SmartImage } from '@/components/ui/SmartImage'
import { useToast } from '@/store/toastStore'
import type { ReactNode } from 'react'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore(selectCartItems)
  const total = useCartStore(selectCartTotal)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const remove = useCartStore((s) => s.remove)
  const toast = useToast()

  const content: ReactNode = (
    <div className="flex flex-col gap-4">
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-pale">
            <ShoppingBag aria-hidden className="h-6 w-6 text-brand-green" />
          </span>
          <p className="text-sm font-medium text-ink">Your cart is empty</p>
          <p className="text-sm text-ink-secondary">
            Add products from the catalogue to see them here.
          </p>
          <Button to="/categories" variant="secondary" size="sm">
            Browse categories
          </Button>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line">
            {items.map(({ productId, quantity }) => {
              const product = getProductById(productId)
              if (!product) return null
              return (
                <li key={productId} className="flex gap-3 py-3">
                  <SmartImage
                    src={product.image}
                    alt={product.alt}
                    className="h-16 w-16 shrink-0 rounded-control border border-line bg-white object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={onClose}
                          className="line-clamp-1 text-sm font-semibold text-ink hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-muted">{product.unit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          remove(productId)
                          toast.info(`${product.name} removed from your cart.`, 'Removed')
                        }}
                        aria-label={`Remove ${product.name} from cart`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-surface-subtle hover:text-state-error focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                      >
                        <Trash2 aria-hidden className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityControl
                        value={quantity}
                        onDecrease={() => decrement(productId)}
                        onIncrease={() => increment(productId)}
                        size="sm"
                        label={`Quantity of ${product.name}`}
                      />
                      <p className="text-sm font-bold text-ink">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="border-t border-line pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-secondary">Subtotal</span>
              <span className="text-lg font-bold text-ink">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-muted">
              Delivery charges and offers are calculated at checkout.
            </p>
            <div className="mt-4">
              <Button size="lg" fullWidth onClick={() => toast.info('Checkout arrives in a later phase.')}>
                Proceed to checkout
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-ink-muted">
              Demonstration cart — orders are not placed in this phase.
            </p>
          </div>
        </>
      )}
    </div>
  )

  return (
    <Modal open={open} onClose={onClose} title="Your cart">
      {content}
    </Modal>
  )
}