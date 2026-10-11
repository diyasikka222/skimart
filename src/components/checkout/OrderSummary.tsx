import { Link } from 'react-router-dom'
import type { CartLine } from '@/lib/pricing'
import type { PricingBreakdown } from '@/types'
import { SmartImage } from '@/components/ui/SmartImage'
import { formatCurrency } from '@/lib/format'
import { PriceBreakdown } from './PriceBreakdown'

interface OrderSummaryProps {
  lines: CartLine[]
  totals: PricingBreakdown
  showFreeDeliveryHint?: boolean
}

/** Read-only order summary used on checkout and order review. */
export function OrderSummary({
  lines,
  totals,
  showFreeDeliveryHint = true,
}: OrderSummaryProps) {
  return (
    <div>
      <ul className="divide-y divide-line">
        {lines.map(({ product, quantity, lineTotal }) => (
          <li key={product.id} className="flex items-center gap-3 py-3">
            <SmartImage
              src={product.image}
              alt={product.alt}
              className="h-14 w-14 shrink-0 rounded-control border border-line bg-white object-contain p-1"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-semibold text-ink">
                <Link
                  to={`/product/${product.slug}`}
                  className="hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                >
                  {product.name}
                </Link>
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {product.unit} · Qty {quantity}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-ink">
              {formatCurrency(lineTotal)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-3 border-t border-line pt-4">
        <PriceBreakdown totals={totals} showFreeDeliveryHint={showFreeDeliveryHint} />
      </div>
    </div>
  )
}