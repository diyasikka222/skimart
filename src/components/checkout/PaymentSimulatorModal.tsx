import { BadgeCheck, CircleX, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

type Result = 'idle' | 'succeeded' | 'failed'

interface PaymentSimulatorModalProps {
  open: boolean
  onClose: () => void
  onResult: (result: 'succeeded' | 'failed') => void
}

/**
 * Fully simulated payment dialog. It never collects card numbers, CVV, UPI,
 * banking passwords or OTPs — there is simply nothing to type.
 */
export function PaymentSimulatorModal({
  open,
  onClose,
  onResult,
}: PaymentSimulatorModalProps) {
  const [result, setResult] = useState<Result>('idle')

  useEffect(() => {
    if (open) setResult('idle')
  }, [open])

  function simulate(next: 'succeeded' | 'failed') {
    onResult(next)
    setResult(next)
  }

  return (
    <Modal open={open} onClose={onClose} title="Demo payment">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 rounded-card border border-line bg-surface-subtle p-4">
          <ShieldCheck aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand-green" />
          <div>
            <p className="text-sm font-semibold text-ink">Simulated payment</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
              This is a demonstration only. No payment is processed and no card or
              banking details are requested.
            </p>
          </div>
        </div>

        {result === 'idle' && (
          <div className="flex flex-col gap-3">
            <Button type="button" size="lg" fullWidth onClick={() => simulate('succeeded')}>
              <BadgeCheck aria-hidden className="h-5 w-5" />
              Simulate successful payment
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => simulate('failed')}
            >
              Simulate failed payment
            </Button>
            <Button type="button" variant="ghost" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </div>
        )}

        {result === 'succeeded' && (
          <div className="flex flex-col items-center gap-3 rounded-card border border-state-success/30 bg-brand-green-pale p-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green">
              <BadgeCheck aria-hidden className="h-6 w-6 text-white" />
            </span>
            <p className="text-base font-bold text-ink">Payment simulation successful</p>
            <p className="text-sm text-ink-secondary">
              No real money was involved. You can now continue and place your demo order.
            </p>
            <Button type="button" size="lg" fullWidth onClick={onClose} className="mt-2">
              Continue
            </Button>
          </div>
        )}

        {result === 'failed' && (
          <div className="flex flex-col items-center gap-3 rounded-card border border-state-error/30 bg-surface-subtle p-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-state-error">
              <CircleX aria-hidden className="h-6 w-6 text-white" />
            </span>
            <p className="text-base font-bold text-ink">Payment simulation failed</p>
            <p className="text-sm text-ink-secondary">
              This demonstrates how a failed payment is handled. Nothing was charged.
            </p>
            <div className="mt-2 flex w-full flex-col gap-3">
              <Button type="button" size="lg" fullWidth onClick={() => setResult('idle')}>
                Try again
              </Button>
              <Button type="button" variant="ghost" fullWidth onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}