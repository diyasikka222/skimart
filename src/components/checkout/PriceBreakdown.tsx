import type { PricingBreakdown } from '@/types'
import { formatCurrency } from '@/lib/format'
import { deliveryConfig } from '@/config/delivery'

interface PriceBreakdownProps {
  totals: PricingBreakdown
  compact?: boolean
  showFreeDeliveryHint?: boolean
}

/** Consistent subtotal / delivery / discount / total rows for every page. */
export function PriceBreakdown({
  totals,
  compact = false,
  showFreeDeliveryHint = false,
}: PriceBreakdownProps) {
  const row = 'flex items-center justify-between text-sm'
  const labelClass = 'text-ink-secondary'
  const valueClass = 'font-semibold text-ink'

  return (
    <dl className="space-y-2.5">
      <div className={row}>
        <dt className={labelClass}>Subtotal</dt>
        <dd className={valueClass}>{formatCurrency(totals.subtotal)}</dd>
      </div>
      <div className={row}>
        <dt className={labelClass}>Delivery charge</dt>
        <dd className={valueClass}>
          {totals.deliveryFee === 0 ? (
            <span className="font-semibold text-state-success">FREE</span>
          ) : (
            formatCurrency(totals.deliveryFee)
          )}
        </dd>
      </div>
      {totals.discount > 0 && (
        <div className={row}>
          <dt className={labelClass}>Discount</dt>
          <dd className="font-semibold text-state-success">
            −{formatCurrency(totals.discount)}
          </dd>
        </div>
      )}
      <div className={`flex items-center justify-between border-t border-line ${compact ? 'pt-2.5' : 'pt-3'}`}>
        <dt className="text-sm font-semibold text-ink">Total payable</dt>
        <dd className="text-lg font-extrabold text-ink">{formatCurrency(totals.total)}</dd>
      </div>
      {showFreeDeliveryHint && totals.deliveryFee > 0 && (
        <p className="text-xs text-ink-muted">
          Add {formatCurrency(deliveryConfig.freeDeliveryThreshold - totals.subtotal)} more to
          unlock free delivery.
        </p>
      )}
    </dl>
  )
}