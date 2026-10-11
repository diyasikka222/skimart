import type { DeliveryAddress, PaymentMethod } from '@/types'

/**
 * Client-side validation for the delivery form and checkout submission.
 * Returns plain error records keyed by field, rendered inline in the form.
 */

export type DeliveryAddressErrors = Partial<Record<keyof DeliveryAddress, string>>

/** Accepts "9876543210", "98765 43210", "+91 9876543210" and "919876543210". */
export function isValidIndianMobile(value: string): boolean {
  let digits = value.replace(/[\s-]/g, '')
  if (digits.startsWith('+91')) digits = digits.slice(3)
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  return /^[6-9]\d{9}$/.test(digits)
}

export function isValidPinCode(value: string): boolean {
  return /^\d{6}$/.test(value.trim())
}

export function validateDeliveryAddress(address: DeliveryAddress): DeliveryAddressErrors {
  const errors: DeliveryAddressErrors = {}

  if (!address.fullName.trim()) errors.fullName = 'Please enter your full name.'

  const mobile = address.mobile.trim()
  if (!mobile) errors.mobile = 'Please enter your mobile number.'
  else if (!isValidIndianMobile(mobile))
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.'

  if (!address.house.trim()) errors.house = 'Please enter your house / flat number.'

  if (!address.street.trim()) errors.street = 'Please enter your street or locality.'

  if (!address.city.trim()) errors.city = 'Please enter your city or town.'

  if (!address.state.trim()) errors.state = 'Please enter your state.'

  const pin = address.pin.trim()
  if (!pin) errors.pin = 'Please enter your PIN code.'
  else if (!isValidPinCode(pin)) errors.pin = 'PIN code must be exactly 6 digits.'

  return errors
}

export interface CheckoutSubmissionIssues {
  address: DeliveryAddressErrors
  payment?: string
}

export function validateCheckoutSubmission(
  address: DeliveryAddress,
  paymentMethod: PaymentMethod | null,
  paymentStatus: 'pending' | 'succeeded' | 'failed',
): CheckoutSubmissionIssues {
  const issues: CheckoutSubmissionIssues = {
    address: validateDeliveryAddress(address),
  }

  if (!paymentMethod) {
    issues.payment = 'Please choose a payment method.'
  } else if (paymentMethod === 'online' && paymentStatus !== 'succeeded') {
    issues.payment = 'Complete the simulated payment before placing your order.'
  }

  return issues
}