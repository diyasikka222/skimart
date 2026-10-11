import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Wallet,
} from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'
import { Button } from '@/components/ui/Button'
import { StateMessage } from '@/components/ui/StateMessage'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { getMockOrderById } from '@/services/orders'
import { getDeliveryOption } from '@/config/delivery'
import { formatOrderDate, paymentMethodLabel } from '@/lib/format'

export function OrderConfirmationPage() {
  const { orderId = '' } = useParams<{ orderId: string }>()
  const [order] = useState(() => getMockOrderById(orderId))

  if (!order) {
    return (
      <PageContainer className="py-10 lg:py-14">
        <StateMessage
          type="error"
          title="Order not found"
          description="We could not find that order on this device. It may have been placed from another browser."
          action={
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button to="/orders" variant="secondary">
                View my orders
              </Button>
              <Button to="/categories" variant="ghost">
                Start shopping
              </Button>
            </div>
          }
        />
      </PageContainer>
    )
  }

  const deliveryOption = getDeliveryOption(order.deliveryOptionId)
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <PageContainer className="py-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center rounded-card border border-line bg-white p-6 text-center shadow-card sm:p-10">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-pale">
            <BadgeCheck aria-hidden className="h-9 w-9 text-brand-green" strokeWidth={2} />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Your order has been placed!
          </h1>
          <p className="mt-2 text-sm text-ink-secondary">
            Thank you for trying the SKIMART demo checkout.
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-orange-tint px-3 py-1 text-xs font-semibold text-brand-orange-deep">
            <BadgeCheck aria-hidden className="h-3.5 w-3.5" />
            Demonstration order — no real order or delivery scheduled
          </span>

          <div className="mt-6 grid w-full gap-3 text-left sm:grid-cols-2">
            <InfoTile label="Order ID" value={order.id} mono />
            <InfoTile label="Order date & time" value={formatOrderDate(order.createdAt)} />
            <InfoTile label="Items" value={`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} />
            <InfoTile label="Payment method" value={paymentMethodLabel(order.paymentMethod)} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <section
            aria-labelledby="confirmation-address"
            className="rounded-card border border-line bg-white p-5 shadow-card"
          >
            <h2 id="confirmation-address" className="flex items-center gap-2 text-base font-bold text-ink">
              <MapPin aria-hidden className="h-4 w-4 text-brand-green" />
              Delivery address
            </h2>
            <dl className="mt-3 space-y-1 text-sm text-ink-secondary">
              <dt className="sr-only">Delivered to</dt>
              <dd className="font-semibold text-ink">{order.deliveryAddress.fullName}</dd>
              <dd>{order.deliveryAddress.mobile}</dd>
              <dd>
                {order.deliveryAddress.house}, {order.deliveryAddress.street}
              </dd>
              <dd>
                {order.deliveryAddress.city}, {order.deliveryAddress.state}{' '}
                {order.deliveryAddress.pin}
              </dd>
              {order.deliveryAddress.landmark && <dd>Landmark: {order.deliveryAddress.landmark}</dd>}
              {order.deliveryOptionId && (
                <dd className="pt-2">
                  <span className="font-semibold text-ink">{deliveryOption?.label ?? 'Home delivery'}</span>
                </dd>
              )}
              {order.deliveryInstructions && (
                <dd className="pt-1.5 text-xs text-ink-muted">
                  Instructions: {order.deliveryInstructions}
                </dd>
              )}
            </dl>
          </section>

          <section
            aria-labelledby="confirmation-payment"
            className="rounded-card border border-line bg-white p-5 shadow-card"
          >
            <h2 id="confirmation-payment" className="flex items-center gap-2 text-base font-bold text-ink">
              <Wallet aria-hidden className="h-4 w-4 text-brand-green" />
              Payment
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-secondary">Method</dt>
                <dd className="font-semibold text-ink">{paymentMethodLabel(order.paymentMethod)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-secondary">Status</dt>
                <dd>
                  {order.paymentMethod === 'cod' ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream px-2.5 py-1 text-xs font-semibold text-brand-orange-deep">
                      Due upon delivery (demo)
                    </span>
                  ) : order.paymentStatus === 'succeeded' ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-pale px-2.5 py-1 text-xs font-semibold text-state-success">
                      <BadgeCheck aria-hidden className="h-3.5 w-3.5" />
                      Payment simulated
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-ink-muted">
                      Simulated ({order.paymentStatus})
                    </span>
                  )}
                </dd>
              </div>
              <p className="pt-2 text-xs leading-relaxed text-ink-muted">
                {order.paymentMethod === 'cod'
                  ? 'In the demo, cash is due only if and when a delivery were to happen.'
                  : 'The online step was simulated locally. No real money moved.'}
              </p>
            </dl>
          </section>
        </div>

        <section
          aria-labelledby="confirmation-items"
          className="mt-6 rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
        >
          <h2 id="confirmation-items" className="flex items-center gap-2 text-base font-bold text-ink">
            <PackageCheck aria-hidden className="h-4 w-4 text-brand-green" />
            Ordered products
          </h2>
          <div className="mt-2">
            <OrderSummary
              lines={order.items.map((item) => ({
                product: {
                  id: item.productId,
                  slug: '',
                  name: item.name,
                  brand: item.brand,
                  categorySlug: '',
                  image: item.image,
                  alt: item.name,
                  unit: item.unit,
                  price: item.price,
                  description: '',
                  isDemo: true,
                  inStock: true,
                },
                quantity: item.quantity,
                lineTotal: item.lineTotal,
              }))}
              totals={{
                subtotal: order.subtotal,
                deliveryFee: order.deliveryFee,
                discount: order.discount,
                total: order.total,
              }}
              showFreeDeliveryHint={false}
            />
          </div>
        </section>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button to="/categories" variant="primary" size="lg">
            <ShoppingBag aria-hidden className="h-5 w-5" />
            Continue shopping
          </Button>
          <Button to={`/orders/${order.id}`} variant="secondary" size="lg">
            View order details
            <ChevronRight aria-hidden className="h-5 w-5" />
          </Button>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1 rounded-control px-3 py-2 text-sm font-semibold text-brand-green underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            My orders
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          This confirmation is stored only in this browser. No real order was placed and no
          delivery is scheduled.
        </p>
      </div>
    </PageContainer>
  )
}

function InfoTile({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="rounded-control border border-line bg-surface-subtle px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className={`mt-0.5 text-sm font-semibold text-ink ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  )
}