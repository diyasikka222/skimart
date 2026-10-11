import { describe, expect, it } from 'vitest'
import {
  isValidIndianMobile,
  isValidPinCode,
  validateCheckoutSubmission,
  validateDeliveryAddress,
} from '@/lib/checkoutValidation'
import type { DeliveryAddress } from '@/types'

const validAddress: DeliveryAddress = {
  fullName: 'Asha Sharma',
  mobile: '9876543210',
  house: '12, Shiv Mandir Road',
  street: 'Pratap Nagar',
  city: 'Amb',
  state: 'Himachal Pradesh',
  pin: '177203',
  landmark: 'Near the bus stand',
}

describe('mobile number validation', () => {
  it('accepts valid Indian mobile numbers', () => {
    expect(isValidIndianMobile('9876543210')).toBe(true)
    expect(isValidIndianMobile('98765 43210')).toBe(true)
    expect(isValidIndianMobile('+91 9876543210')).toBe(true)
    expect(isValidIndianMobile('919876543210')).toBe(true)
  })

  it('rejects invalid numbers', () => {
    expect(isValidIndianMobile('')).toBe(false)
    expect(isValidIndianMobile('1234567890')).toBe(false)
    expect(isValidIndianMobile('5876543210')).toBe(false)
    expect(isValidIndianMobile('987654321')).toBe(false)
  })
})

describe('pin code validation', () => {
  it('accepts exactly six digits', () => {
    expect(isValidPinCode('177203')).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isValidPinCode('17720')).toBe(false)
    expect(isValidPinCode('1772034')).toBe(false)
    expect(isValidPinCode('abc123')).toBe(false)
    expect(isValidPinCode('')).toBe(false)
  })
})

describe('delivery address validation', () => {
  it('passes a complete valid address', () => {
    expect(validateDeliveryAddress(validAddress)).toEqual({})
  })

  it('flags every empty required field', () => {
    const errors = validateDeliveryAddress({
      fullName: '',
      mobile: '',
      house: '',
      street: '',
      city: '',
      state: '',
      pin: '',
    })
    expect(Object.keys(errors).sort()).toEqual(
      ['city', 'fullName', 'house', 'mobile', 'pin', 'state', 'street'].sort(),
    )
  })

  it('flags an invalid mobile and PIN with specific messages', () => {
    const errors = validateDeliveryAddress({
      ...validAddress,
      mobile: '12345',
      pin: '12',
    })
    expect(errors.mobile).toMatch(/valid 10-digit Indian mobile/i)
    expect(errors.pin).toMatch(/6 digits/i)
  })

  it('clears errors for corrected fields', () => {
    const errors = validateDeliveryAddress({ ...validAddress, pin: '177203' })
    expect(errors.pin).toBeUndefined()
  })
})

describe('checkout submission validation', () => {
  it('requires a payment method', () => {
    const issues = validateCheckoutSubmission(validAddress, null, 'pending')
    expect(issues.payment).toMatch(/choose a payment method/i)
  })

  it('requires a successful simulation for online payment', () => {
    const pending = validateCheckoutSubmission(validAddress, 'online', 'pending')
    expect(pending.payment).toMatch(/complete the simulated payment/i)

    const succeeded = validateCheckoutSubmission(validAddress, 'online', 'succeeded')
    expect(succeeded.payment).toBeUndefined()
  })

  it('allows cash on delivery without an online simulation', () => {
    const issues = validateCheckoutSubmission(validAddress, 'cod', 'pending')
    expect(issues.payment).toBeUndefined()
  })
})