import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageTitle } from '@/components/ui/PageTitle'
import { StateMessage } from '@/components/ui/StateMessage'
import { Button } from '@/components/ui/Button'
import { QuantityControl } from '@/components/ui/QuantityControl'
import { SmartImage } from '@/components/ui/SmartImage'
import { PriceBreakdown } from '@/components/checkout/PriceBreakdown'
import {
  selectCartItems,
  useCartStore,
} from '@/store/cartStore'
import { resolveCartLines, calculateCartTotals, isDeliveryFree } from '@/lib/pricing'
import { formatCurrency } from '@/lib/format'
import { useToast } from '@/store/toastStore'
import { deliveryConfig } from '@/config/delivery'

const MAX_QUANTITY = 99

export function CartPage() {
  const items = useCartStore(selectCartItems)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const remove = useCartStore((s) => s.remove)
  const toast = useToast()

  const lines = resolveCartLines(items)
  const totals = calculateCartTotals(items)
  const freeDelivery = isDeliveryFree(totals.subtotal)

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Your shopping cart' }]} />

      <div className="mt-6">
        <PageTitle title="Your shopping cart" />
      </div>

      {lines.length === 0 ? (
        <div className="mt-6">
          <StateMessage
            type="empty"
            title="Your cart is empty"
            description="Add a few products from the catalogue and they will appear here."
            action={
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button to="/categories" variant="primary">
                  <ShoppingBag aria-hidden className="h-4 w-4" />
                  Start shopping
                </Button>
                <Button to="/" variant="ghost">
                  Back to homepage
                </Button>
              </div>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          <div className="rounded-card border border-line bg-white shadow-card">
            <ul className="divide-y divide-line">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex gap-4 p-4 sm:p-5">
                  <SmartImage
                    src={product.image}
                    alt={product.alt}
                    className="h-20 w-20 shrink-0 rounded-control border border-line bg-white object-contain p-1.5"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                          {product.brand}
                        </p>
                        <h2 className="mt-0.5 text-sm font-semibold text-ink">
                          <Link
                            to={`/product/${product.slug}`}
                            className="hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                          >
                            {product.name}
                          </Link>
                        </h2>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          {product.unit} · {formatCurrency(product.price)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          remove(product.id)
                          toast.info(`${product.name} removed from your cart.`, 'Removed')
                        }}
                        aria-label={`Remove ${product.name} from cart`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-surface-subtle hover:text-state-error focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                      >
                        <Trash2 aria-hidden className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <QuantityControl
                        value={quantity}
                        max={MAX_QUANTITY}
                        onDecrease={() => decrement(product.id)}
                        onIncrease={() => increment(product.id)}
                        size="sm"
                        label={`Quantity of ${product.name}`}
                      />
                      <p className="text-base font-bold text-ink">
                        {formatCurrency(lineTotal)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-line bg-white p-5 shadow-card lg:sticky lg:top-28">
            <h2 className="text-base font-bold text-ink">Order summary</h2>
            <p className="mt-1 text-xs text-ink-muted">
              {lines.reduce((sum, line) => sum + line.quantity, 0)}{' '}
              {lines.reduce((sum, line) => sum + line.quantity, 0) === 1 ? 'item' : 'items'} in
              your cart.
            </p>

            {freeDelivery && (
              <p className="mt-3 rounded-control bg-brand-green-pale px-3 py-2 text-xs font-semibold text-state-success">
                Yay — free delivery is unlocked for this order.
              </p>
            )}
            {!freeDelivery && totals.subtotal > 0 && (
              <p className="mt-3 rounded-control bg-brand-cream px-3 py-2 text-xs font-medium text-ink-secondary">
                Orders of {formatCurrency(deliveryConfig.freeDeliveryThreshold)} or more get
                free delivery.
              </p>
            )}

            <div className="mt-4">
              <PriceBreakdown totals={totals} />
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <Button to="/checkout" variant="primary" size="lg" fullWidth>
                Proceed to checkout
              </Button>
              <Button to="/categories" variant="ghost" fullWidth>
                <ArrowLeft aria-hidden className="h-4 w-4" />
                Continue shopping
              </Button>
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
              Demonstration checkout — no payment is processed and no real order is placed.
            </p>
          </div>
        </div>
      )}
    </PageContainer>
  )
}