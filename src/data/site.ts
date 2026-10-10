import type { DeliveryPoint } from '@/types'

/**
 * Verified business information for SKIMART by Retail NEO LLP.
 * Contact details are intentionally omitted until the store supplies them.
 */
export const siteConfig = {
  brandName: 'SKIMART',
  businessName: 'Retail NEO LLP',
  legalBusinessName: 'SKIMART by Retail NEO LLP',
  tagline: 'Your neighbourhood supermarket',
  addressLines: [
    'Una Road, NH 503, Pratap Nagar, Amb',
    'District Una, Himachal Pradesh 177203',
  ],
  defaultLocation: 'Una Road, Amb',
  /** Demonstration delivery points — NOT a claim of live serviceability. */
  demoDeliveryPoints: [
    { locality: 'Amb', pin: '177203' },
    { locality: 'Pratap Nagar, Amb', pin: '177203' },
    { locality: 'Una', pin: '174303' },
  ] as DeliveryPoint[],
} as const