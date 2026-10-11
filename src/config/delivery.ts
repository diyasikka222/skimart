import type { DeliveryOption } from '@/types'

/**
 * Demonstration delivery rules for the mock checkout.
 *
 * These are example values for a frontend-only demo. They are not a claim of
 * live delivery service, zones or guarantees — the store will confirm the real
 * rules before any production ordering goes live.
 */
export const deliveryConfig = {
  currency: 'INR',
  /** Delivery fee applied below the free-delivery threshold. */
  standardFee: 30,
  /** Orders at or above this subtotal get free delivery. */
  freeDeliveryThreshold: 499,
  /** Optional minimum order value. null = no minimum enforced in the demo. */
  minOrderValue: null as number | null,
  options: [
    {
      id: 'standard',
      label: 'Standard home delivery',
      description:
        'Packed at the store and delivered on the next available delivery run.',
      fee: 30,
    },
  ] as DeliveryOption[],
} as const

export function getDeliveryOption(optionId: string): DeliveryOption | undefined {
  return deliveryConfig.options.find((option) => option.id === optionId)
}