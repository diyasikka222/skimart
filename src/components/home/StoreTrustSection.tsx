import { BadgeCheck, Home, Leaf, Truck } from 'lucide-react'
import { SmartImage } from '@/components/ui/SmartImage'
import { PageContainer } from '@/components/ui/PageContainer'
import { assetUrls } from '@/data/assets'

const items = [
  {
    icon: BadgeCheck,
    title: 'Trusted brands',
    copy: 'National brands and familiar names you already buy.',
  },
  {
    icon: Leaf,
    title: 'Quality groceries',
    copy: 'Fresh produce and essentials, checked as they reach the shelf.',
  },
  {
    icon: Home,
    title: 'Serving our local community',
    copy: 'A neighbourhood supermarket for Amb, Una and around.',
  },
  {
    icon: Truck,
    title: 'Convenient home delivery',
    copy: 'Order online and get your groceries delivered to your door.',
  },
]

export function StoreTrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="mt-10 lg:mt-14">
      <div className="bg-brand-cream">
        <PageContainer className="py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-deep">
                Your neighbourhood store
              </p>
              <h2
                id="trust-heading"
                className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
              >
                A local store you can count on
              </h2>
              <p className="mt-3 text-base text-ink-secondary">
                Clear prices. Familiar products. Convenient home delivery.
              </p>

              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex gap-3.5">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-white text-brand-green shadow-sm">
                        <Icon aria-hidden className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                          {item.copy}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-banner bg-brand-green-pale/70" aria-hidden="true" />
              <SmartImage
                src={assetUrls.storeInterior}
                alt="The SKIMART neighbourhood supermarket store interior"
                className="relative aspect-[4/3] w-full rounded-banner object-cover shadow-card"
              />
            </div>
          </div>
        </PageContainer>
      </div>
    </section>
  )
}