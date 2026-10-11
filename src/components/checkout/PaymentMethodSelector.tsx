import { BadgeCheck, Banknote, ChevronRight, TriangleAlert, Wifi } from 'lucide-react'
import type { ReactNode } from 'react'
import type { MockPaymentStatus, PaymentMethod } from '@/types'

interface PaymentMethodSelectorProps {
  value: PaymentMethod | null
  paymentStatus: MockPaymentStatus
  error?: string
  onSelect: (method: PaymentMethod) => void
  onSimulateOnline: () => void
}

/** Demo payment method picker. No real credentials are ever collected. */
export function PaymentMethodSelector({
  value,
  paymentStatus,
  error,
  onSelect,
  onSimulateOnline,
}: PaymentMethodSelectorProps) {
  const codChecked = value === 'cod'
  const onlineChecked = value === 'online'

  return (
    <div>
      <div role="radiogroup" aria-label="Demo payment method" className="space-y-3">
        <PaymentOption
          checked={codChecked}
          onChange={() => onSelect('cod')}
          icon={<Banknote aria-hidden className="h-5 w-5 text-brand-green" />}
          title="Cash on Delivery (Demo)"
          description="Pay the delivery partner when your order arrives. Nothing is charged now."
        />
        <PaymentOption
          checked={onlineChecked}
          onChange={() => onSelect('online')}
          icon={<Wifi aria-hidden className="h-5 w-5 text-brand-green" />}
          title="Online Payment Simulation (Demo)"
          description="A simulated payment screen. No real card, UPI PIN or bank details are collected."
        />
      </div>

      {value === 'online' && (
        <div className="mt-3 rounded-card border border-line bg-surface-subtle p-3.5">
          {paymentStatus === 'succeeded' && (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-state-success">
              <BadgeCheck aria-hidden className="h-5 w-5" />
              Demo payment simulated successfully.
            </p>
          )}
          {paymentStatus === 'failed' && (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-state-error">
              <TriangleAlert aria-hidden className="h-5 w-5" />
              The simulated payment failed. Try again to continue.
            </p>
          )}
          {paymentStatus !== 'succeeded' && (
            <button
              type="button"
              onClick={onSimulateOnline}
              className="inline-flex items-center gap-1.5 rounded-control bg-brand-green px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-standard ease-standard hover:bg-brand-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              {paymentStatus === 'failed' ? 'Retry simulation' : 'Simulate payment'}
              <ChevronRight aria-hidden className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-state-error">
          {error}
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        This is a demonstration checkout. No real payment is processed and no order is sent
        to the store.
      </p>
    </div>
  )
}

function PaymentOption({
  checked,
  onChange,
  icon,
  title,
  description,
}: {
  checked: boolean
  onChange: () => void
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors duration-standard ease-standard focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-orange ${
        checked
          ? 'border-brand-green bg-brand-green-pale/60'
          : 'border-line bg-white hover:border-brand-green/40'
      }`}
    >
      <input
        type="radio"
        name="payment-method"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 accent-[var(--brand-green)]"
      />
      <span className="flex-1">
        <span className="flex items-center gap-2 font-semibold text-ink">
          {icon}
          {title}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-secondary">
          {description}
        </span>
      </span>
    </label>
  )
}