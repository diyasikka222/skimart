import type { Ref } from 'react'
import type { DeliveryAddress } from '@/types'
import type { DeliveryAddressErrors } from '@/lib/checkoutValidation'
import { Field } from './Field'

interface DeliveryAddressFormProps {
  value: DeliveryAddress
  errors: DeliveryAddressErrors
  onChange: (field: keyof DeliveryAddress, next: string) => void
  /** Optional input refs so the parent can focus the first invalid field. */
  inputRefs?: Partial<Record<keyof DeliveryAddress, Ref<HTMLInputElement>>>
}

/** Validated delivery + contact form used inside the checkout page. */
export function DeliveryAddressForm({
  value,
  errors,
  onChange,
  inputRefs,
}: DeliveryAddressFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field
        label="Full name"
        value={value.fullName}
        error={errors.fullName}
        onChange={(e) => onChange('fullName', e.target.value)}
        autoComplete="name"
        placeholder="Your name"
        inputRef={inputRefs?.fullName}
      />
      <Field
        label="Mobile number"
        value={value.mobile}
        error={errors.mobile}
        onChange={(e) => onChange('mobile', e.target.value)}
        autoComplete="tel"
        inputMode="tel"
        placeholder="10-digit mobile number"
        hint="We will only use this for delivery coordination in the demo."
        inputRef={inputRefs?.mobile}
      />
      <Field
        label="House / flat number"
        value={value.house}
        error={errors.house}
        onChange={(e) => onChange('house', e.target.value)}
        autoComplete="street-address"
        placeholder="e.g. 12, Shiv Mandir Road"
        inputRef={inputRefs?.house}
      />
      <Field
        label="Street / locality"
        value={value.street}
        error={errors.street}
        onChange={(e) => onChange('street', e.target.value)}
        placeholder="Street, colony or locality"
        inputRef={inputRefs?.street}
      />
      <Field
        label="City / town"
        value={value.city}
        error={errors.city}
        onChange={(e) => onChange('city', e.target.value)}
        autoComplete="address-level2"
        placeholder="City or town"
        inputRef={inputRefs?.city}
      />
      <Field
        label="State"
        value={value.state}
        error={errors.state}
        onChange={(e) => onChange('state', e.target.value)}
        autoComplete="address-level1"
        placeholder="State"
        inputRef={inputRefs?.state}
      />
      <Field
        label="PIN code"
        value={value.pin}
        error={errors.pin}
        onChange={(e) => onChange('pin', e.target.value)}
        autoComplete="postal-code"
        inputMode="numeric"
        maxLength={6}
        placeholder="6-digit PIN"
        inputRef={inputRefs?.pin}
      />
      <Field
        label="Landmark (optional)"
        value={value.landmark ?? ''}
        error={errors.landmark}
        onChange={(e) => onChange('landmark', e.target.value)}
        placeholder="Near a shop or landmark"
        inputRef={inputRefs?.landmark}
      />
    </div>
  )
}