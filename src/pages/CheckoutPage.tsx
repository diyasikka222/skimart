import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info, LockKeyhole, ShoppingBag } from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { StateMessage } from '@/components/ui/StateMessage'
import { DeliveryAddressForm } from '@/components/checkout/DeliveryAddressForm'
import { DeliveryOptionsSelector } from '@/components/checkout/DeliveryOptionsSelector'
import { FieldArea } from '@/components/checkout/Field'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector'
import { PaymentSimulatorModal } from '@/components/checkout/PaymentSimulatorModal'
import { selectCartItems, useCartStore } from '@/store/cartStore'
import { resolveCartLines, calculateCartTotals } from '@/lib/pricing'
import {
  validateCheckoutSubmission,
  type DeliveryAddressErrors,
} from '@/lib/checkoutValidation'
import { createMockOrder } from '@/services/orders'
import { useToast } from '@/store/toastStore'
import type { DeliveryAddress, MockPaymentStatus, PaymentMethod } from '@/types'

const FIELD_ORDER: (keyof DeliveryAddress)[] = [
  'fullName',
  'mobile',
  'house',
  'street',
  'city',
  'state',
  'pin',
]

export function CheckoutPage() {
  const navigate = useNavigate()
  const toast = useToast()

  const items = useCartStore(selectCartItems)
  const clearCart = useCartStore((s) => s.clear)

  const lines = resolveCartLines(items)
  const totals = calculateCartTotals(items)

  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    mobile: '',
    house: '',
    street: '',
    city: 'Amb',
    state: 'Himachal Pradesh',
    pin: '',
    landmark: '',
  })
  const [deliveryOptionId, setDeliveryOptionId] = useState('standard')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<MockPaymentStatus>('pending')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [errors, setErrors] = useState<DeliveryAddressErrors & { payment?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  const fieldRefs = useRef<Partial<Record<keyof DeliveryAddress, HTMLInputElement | null>>>({})
  const submittingRef = useRef(false)

  if (lines.length === 0) {
    return (
      <PageContainer className="py-8 lg:py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <div className="mt-6">
          <StateMessage
            type="empty"
            title="Your cart is empty"
            description="Add products to your cart before heading to checkout."
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
      </PageContainer>
    )
  }

  function setFieldRef(field: keyof DeliveryAddress) {
    return (element: HTMLInputElement | null) => {
      fieldRefs.current[field] = element
    }
  }

  const addressInputRefs = Object.fromEntries(
    FIELD_ORDER.map((field) => [field, setFieldRef(field)]),
  ) as Partial<Record<keyof DeliveryAddress, (element: HTMLInputElement | null) => void>>

  function handleAddressChange(field: keyof DeliveryAddress, next: string) {
    setAddress((current) => ({ ...current, [field]: next }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSelectPaymentMethod(method: PaymentMethod) {
    setPaymentMethod(method)
    setPaymentStatus('pending')
    if (errors.payment) setErrors((current) => ({ ...current, payment: undefined }))
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingRef.current) return

    const issues = validateCheckoutSubmission(address, paymentMethod, paymentStatus)
    const hasAddressErrors = Object.values(issues.address).some(Boolean)
    setErrors({
      ...issues.address,
      payment: issues.payment,
    })

    if (hasAddressErrors || issues.payment) {
      if (hasAddressErrors) {
        const firstInvalid = FIELD_ORDER.find((key) => issues.address[key])
        if (firstInvalid) fieldRefs.current[firstInvalid]?.focus()
        toast.error('Please fix the highlighted fields in your delivery details.')
      } else {
        toast.error('Please choose and complete a payment method.')
      }
      return
    }

    submittingRef.current = true
    setSubmitting(true)
    try {
      const order = createMockOrder({
        items,
        deliveryAddress: address,
        deliveryOptionId,
        deliveryInstructions,
        paymentMethod: paymentMethod as PaymentMethod,
        paymentStatus,
      })
      clearCart()
      navigate(`/order-confirmation/${order.id}`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Your demo order could not be created.',
        'Order not placed',
      )
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]}
      />

      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Checkout
      </h1>

      <div className="mt-4 flex items-start gap-3 rounded-card border border-brand-orange/30 bg-brand-cream p-4">
        <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-deep" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          This is a <strong className="font-semibold text-ink">demonstration checkout</strong>.
          It runs entirely in your browser — no payment is processed and no real order reaches
          the store.
        </p>
      </div>

      <form onSubmit={placeOrder} noValidate className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
        <div className="flex flex-col gap-6">
          <section
            aria-labelledby="checkout-delivery-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <h2 id="checkout-delivery-heading" className="text-base font-bold text-ink">
              Delivery address
            </h2>
            <p className="mt-1 text-sm text-ink-secondary">
              Where should we deliver your demo order?
            </p>
            <div className="mt-5">
              <DeliveryAddressForm
                value={address}
                errors={errors}
                onChange={handleAddressChange}
                inputRefs={addressInputRefs}
              />
            </div>
          </section>

          <section
            aria-labelledby="checkout-options-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <h2 id="checkout-options-heading" className="text-base font-bold text-ink">
              Delivery options
            </h2>
            <div className="mt-4">
              <DeliveryOptionsSelector
                value={deliveryOptionId}
                subtotal={totals.subtotal}
                onChange={setDeliveryOptionId}
              />
            </div>
          </section>

          <section
            aria-labelledby="checkout-instructions-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <h2 id="checkout-instructions-heading" className="text-base font-bold text-ink">
              Delivery instructions <span className="font-normal text-ink-muted">(optional)</span>
            </h2>
            <p className="mt-1 text-sm text-ink-secondary">
              Anything the delivery partner should know, like a call before arriving.
            </p>
            <div className="mt-4">
              <FieldArea
                label="Order notes"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="e.g. Call me when you reach the gate."
                maxLength={300}
              />
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <section
            aria-labelledby="checkout-order-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <h2 id="checkout-order-heading" className="text-base font-bold text-ink">
              Order summary
            </h2>
            <div className="mt-2">
              <OrderSummary lines={lines} totals={totals} />
            </div>
          </section>

          <section
            aria-labelledby="checkout-payment-heading"
            className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <h2 id="checkout-payment-heading" className="flex items-center gap-2 text-base font-bold text-ink">
              <LockKeyhole aria-hidden className="h-4 w-4 text-brand-green" />
              Demo payment method
            </h2>
            <p className="mt-1 text-sm text-ink-secondary">
              Select how this <em>simulated</em> order will be marked as paid.
            </p>
            <div className="mt-4">
              <PaymentMethodSelector
                value={paymentMethod}
                paymentStatus={paymentStatus}
                error={errors.payment}
                onSelect={handleSelectPaymentMethod}
                onSimulateOnline={() => setPaymentModalOpen(true)}
              />
            </div>
          </section>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? 'Placing demo order…' : 'Place order'}
          </Button>
          <p className="-mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
            <LockKeyhole aria-hidden className="h-3.5 w-3.5" />
            Your cart and details stay on this device.
          </p>
        </div>
      </form>

      <PaymentSimulatorModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onResult={(result) => setPaymentStatus(result)}
      />
    </PageContainer>
  )
}