import { BadgeCheck, ReceiptText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageTitle } from '@/components/ui/PageTitle'
import { StateMessage } from '@/components/ui/StateMessage'
import { Button } from '@/components/ui/Button'
import { getMockOrderHistory } from '@/services/orders'
import { formatOrderDateShort, formatCurrency, priceStateLabel } from '@/lib/format'

export function OrdersPage() {
  const orders = getMockOrderHistory()

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My orders' }]} />

      <div className="mt-6">
        <PageTitle title="My orders" description="Your demonstration orders, stored only on this device." />
      </div>

      {orders.length === 0 ? (
        <div className="mt-6">
          <StateMessage
            type="empty"
            title="No orders yet"
            description="When you place a demo order through checkout, it will appear here."
            action={
              <Button to="/categories" variant="secondary">
                Start shopping
              </Button>
            }
          />
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {orders.map((order) => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
            return (
              <li key={order.id}>
                <Link
                  to={`/orders/${order.id}`}
                  className="group block rounded-card border border-line bg-white p-5 shadow-card transition-all duration-standard ease-standard hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-brand-green-pale">
                        <ReceiptText aria-hidden className="h-5 w-5 text-brand-green" />
                      </span>
                      <div>
                        <p className="font-mono text-sm font-bold text-ink">{order.id}</p>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          {formatOrderDateShort(order.createdAt)} · {itemCount}{' '}
                          {itemCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-extrabold text-ink">
                        {formatCurrency(order.total)}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted">
  {priceStateLabel(order.paymentMethod, order.paymentStatus)}
</p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      <div className="mt-8 rounded-card border border-brand-orange/30 bg-brand-cream p-4">
        <p className="flex items-start gap-2 text-sm leading-relaxed text-ink-secondary">
          <BadgeCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-deep" />
          <span>
            These are <strong className="font-semibold text-ink">demo records</strong>. They exist
            only in this browser and were never sent to the store. Nothing is guaranteed about
            delivery.
          </span>
        </p>
      </div>
    </PageContainer>
  )
}