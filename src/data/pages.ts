import { siteConfig } from './site'

export interface InfoSection {
  heading: string
  paragraphs: string[]
}

export interface InfoPageContent {
  slug: string
  title: string
  description: string
  sections: InfoSection[]
}

export const infoPages: Record<string, InfoPageContent> = {
  about: {
    slug: 'about',
    title: 'About SKIMART',
    description:
      'SKIMART is a neighbourhood supermarket operated by Retail NEO LLP in Amb, District Una, Himachal Pradesh.',
    sections: [
      {
        heading: 'A local store, built for daily shopping',
        paragraphs: [
          `${siteConfig.brandName} is a local supermarket serving everyday grocery needs — fresh produce, dairy, staples, snacks and household essentials. We bring together familiar brands and everyday products under one roof.`,
          'We are building an online storefront so you can browse the same products at the store and get them delivered home. Fair, clearly displayed prices and dependable stock are central to how we want to serve our community.',
        ],
      },
      {
        heading: 'Where we are',
        paragraphs: [
          `${siteConfig.addressLines[0]}, ${siteConfig.addressLines[1]}.`,
          'This website is the first phase of the project. Product prices you see here are demonstration placeholders until the store confirms its catalogue.',
        ],
      },
    ],
  },
  faq: {
    slug: 'faq',
    title: 'Frequently asked questions',
    description: 'Common questions about shopping with SKIMART.',
    sections: [
      {
        heading: 'Is this live store actually delivering now?',
        paragraphs: [
          'Not yet. The checkout on this site is a front-end demonstration: you can walk through a mock order, a simulated payment and a confirmation screen, but no order reaches the store and no delivery is scheduled.',
        ],
      },
      {
        heading: 'Are the prices shown final?',
        paragraphs: [
          'No. Prices shown here are initial demonstration values so the storefront can be built and reviewed. They are marked “Demo pricing” until the store confirms real retail prices.',
        ],
      },
      {
        heading: 'Can I pay online?',
        paragraphs: [
          'Real online payments are not enabled. The checkout includes a clearly labelled payment simulation that never collects card, UPI, banking or OTP details, and no money ever moves.',
        ],
      },
      {
        heading: 'How do I add a product to my cart?',
        paragraphs: [
          'Open any product card or product page and tap the orange “Add” button. The cart icon in the header opens your cart. You can adjust quantities and check out from there. Your cart and any demo orders are stored only on your own device.',
        ],
      },
      {
        heading: 'Is my data safe on this site?',
        paragraphs: [
          'In this phase the site only stores your cart, favourites and any demo order records on your own device. We do not request or store passwords, payment details or sensitive personal information.',
        ],
      },
    ],
  },
  delivery: {
    slug: 'delivery-information',
    title: 'Delivery information',
    description:
      'How SKIMART home delivery will work once online ordering is live.',
    sections: [
      {
        heading: 'Home delivery, from the store near you',
        paragraphs: [
          'SKIMART intends to offer home delivery of groceries ordered online from the store in Amb, District Una, Himachal Pradesh. Products are packed at the store and delivered to your address.',
        ],
      },
      {
        heading: 'What is confirmed right now?',
        paragraphs: [
          'Nothing about delivery is guaranteed at this stage. The checkout shows a mock delivery fee and a free-delivery threshold so the experience can be reviewed, but these are demonstration rules — not a claim of live service. Delivery zones, charges, minimum order values and delivery times will be displayed only when confirmed by the store.',
        ],
      },
      {
        heading: 'Where can I pick my delivery location?',
        paragraphs: [
          'Use the location selector in the header to save your locality or PIN on this device. Until a delivery-zone backend exists, this selection is for demonstration only and does not confirm serviceability.',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy-policy',
    title: 'Privacy policy',
    description:
      'A plain-language summary of how this storefront treats your information.',
    sections: [
      {
        heading: 'Minimal data, kept on your device',
        paragraphs: [
          'In this demonstration phase the website stores only what you explicitly create: products in your cart and your saved favourites. This data is kept in your browser’s local storage on your own device and is not sent to any server.',
        ],
      },
      {
        heading: 'We do not ask for sensitive data',
        paragraphs: [
          'This website never asks for or stores passwords, payment card numbers, OTPs or other sensitive information. Do not enter such information anywhere on this site.',
        ],
      },
      {
        heading: 'When ordering goes live',
        paragraphs: [
          'When account, checkout and delivery features are introduced, this policy will be updated to describe exactly what is collected, why, and how it is protected. Changes will be reflected on this page.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms-and-conditions',
    title: 'Terms & conditions',
    description:
      'The terms that apply while using the SKIMART demonstration storefront.',
    sections: [
      {
        heading: 'Demonstration website',
        paragraphs: [
          'This website is currently a demonstration storefront for SKIMART by Retail NEO LLP. Product listings, prices and availability are placeholders for development and do not constitute an offer to sell.',
        ],
      },
      {
        heading: 'Checkout is a simulation',
        paragraphs: [
          'The cart and checkout are front-end demonstrations. Completing them creates a mock order stored only in your browser; it is not sent to the store, does not constitute a binding order, and no delivery is scheduled. The payment step is simulated and processes no money.',
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: [
          'Use this website lawfully and do not attempt to disrupt it, submit harmful data, or misuse the demonstration features. We reserve the right to restrict access in case of misuse.',
        ],
      },
    ],
  },
  returns: {
    slug: 'returns-and-refunds',
    title: 'Returns & refunds',
    description:
      'How product returns and refunds will be handled once ordering is live.',
    sections: [
      {
        heading: 'Policy to be confirmed by the store',
        paragraphs: [
          'The store is still defining its returns and refunds policy for online orders. This page will be updated with clear, confirmed rules for damaged, expired or incorrect items before any order flow goes live.',
        ],
      },
      {
        heading: 'For now',
        paragraphs: [
          'No returns or refunds can be processed through this demonstration website, because no orders are placed here. For products bought in-store, speak directly with the store staff.',
        ],
      },
    ],
  },
}

export const infoPageSlugs = Object.keys(infoPages)