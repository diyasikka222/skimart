import { Truck } from 'lucide-react'
import type { DeliveryOption } from '@/types'
import { deliveryConfig } from '@/config/delivery'
import { isDeliveryFree } from '@/lib/pricing'
import { formatCurrency } from '@/lib/format'

interface DeliveryOptionsSelectorProps {
  value: string
  subtotal: number
  onChange: (optionId: string) => void
}

export function DeliveryOptionsSelector({
  value,
  subtotal,
  onChange,
}: DeliveryOptionsSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Delivery options" className="space-y-3">
      {deliveryConfig.options.map((option: DeliveryOption) => {
        const checked = option.id === value
        const free = isDeliveryFree(subtotal)
        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors duration-standard ease-standard focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-orange ${
              checked ? 'border-brand-green bg-brand-green-pale/60' : 'border-line bg-white hover:border-brand-green/40'
            }`}
          >
            <input
              type="radio"
              name="delivery-option"
              value={option.id}
              checked={checked}
              onChange={() => onChange(option.id)}
              className="mt-1 h-4 w-4 accent-[var(--brand-green)]"
            />
            <span className="flex-1">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-semibold text-ink">
                  <Truck aria-hidden className="h-4 w-4 text-brand-green" />
                  {option.label}
                </span>
                <span className="text-sm font-bold text-ink">
                  {free ? (
                    <span className="text-state-success">FREE</span>
                  ) : (
                    formatCurrency(option.fee)
                  )}
                </span>
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-secondary">
                {option.description}
              </span>
              {free && (
                <span className="mt-1 block text-xs font-semibold text-state-success">
                  Free delivery unlocked for your order.
                </span>
              )}
            </span>
          </label>
        )
      })}
    </div>
  )
}