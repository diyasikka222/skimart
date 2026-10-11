import { ChevronLeft, MapPin, PackageCheck, Wallet } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { StateMessage } from '@/components/ui/StateMessage'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { getMockOrderById } from '@/services/orders'
import { getDeliveryOption } from '@/config/delivery'
import { formatOrderDate, priceStateLabel, paymentMethodLabel } from '@/lib/format'

export function OrderDetailsPage() {
  const { orderId = '' } = useParams<{ orderId: string }>()
  const order = getMockOrderById(orderId)

  if (!order) {
    return (
      <PageContainer className="py-10 lg:py-14">
        <StateMessage
          type="error"
          title="Order not found"
          description="This order does not exist on this device. Orders are stored only in the browser where they were created."
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
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'My orders', to: '/orders' },
          { label: order.id },
        ]}
      />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-deep">
            Demonstration order
          </p>
          <h1 className="mt-2 font-mono text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {order.id}
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            Placed on {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 rounded-control px-3 py-2 text-sm font-semibold text-brand-green hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <ChevronLeft aria-hidden className="h-4 w-4" />
          Back to my orders
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="order-items-heading"
          className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
        >
          <h2 id="order-items-heading" className="flex items-center gap-2 text-base font-bold text-ink">
            <PackageCheck aria-hidden className="h-4 w-4 text-brand-green" />
            Items ({itemCount})
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

        <div className="flex flex-col gap-6">
          <section
            aria-labelledby="order-address-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card"
          >
            <h2 id="order-address-heading" className="flex items-center gap-2 text-base font-bold text-ink">
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
              {deliveryOption && (
                <dd className="pt-2 text-xs text-ink-muted">{deliveryOption.label}</dd>
              )}
              {order.deliveryInstructions && (
                <dd className="text-xs text-ink-muted">Instructions: {order.deliveryInstructions}</dd>
              )}
            </dl>
          </section>

          <section
            aria-labelledby="order-payment-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card"
          >
            <h2 id="order-payment-heading" className="flex items-center gap-2 text-base font-bold text-ink">
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
                <dd className="font-semibold text-ink">{priceStateLabel(order.paymentMethod, order.paymentStatus)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Recorded from the saved demo order snapshot. Prices here never change even if the
              current catalogue price changes.
            </p>
          </section>
        </div>
      </div>

      <div className="mt-8">
        <Button to="/categories" variant="primary" size="lg">
          Continue shopping
        </Button>
      </div>
    </PageContainer>
  )
}