import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SmartImage } from '@/components/ui/SmartImage'
import { assetUrls } from '@/data/assets'

const promotions = [
  {
    key: 'fresh',
    title: 'Fresh from the store',
    copy: 'Fresh fruits and vegetables for your daily nutrition.',
    cta: 'Shop fresh produce',
    to: '/category/fruits-vegetables',
    image: assetUrls.promo.freshProduce,
    imageAlt: 'Fresh vegetables with leafy greens and citrus fruit',
    bg: 'bg-brand-green-pale',
  },
  {
    key: 'household',
    title: 'Household essentials',
    copy: 'Cleaning, laundry and daily home care products.',
    cta: 'Shop household',
    to: '/category/home-cleaning',
    image: assetUrls.promo.household,
    imageAlt: 'Cleaning and laundry products arranged neatly',
    bg: 'bg-brand-cream',
  },
  {
    key: 'snacks',
    title: 'Snacks for every craving',
    copy: 'Biscuits, namkeen, chips and more.',
    cta: 'Shop snacks',
    to: '/category/snacks-namkeen',
    image: assetUrls.promo.snacks,
    imageAlt: 'Packaged snack foods including chips and biscuits',
    bg: 'bg-brand-orange-tint',
  },
]

export function PromotionSection() {
  return (
    <section aria-label="Featured shopping categories" className="mt-10 lg:mt-14">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {promotions.map((promo) => (
          <article
            key={promo.key}
            className={`group relative overflow-hidden rounded-card ${promo.bg} p-6`}
          >
            <div className="flex h-full flex-col gap-4">
              <div className="relative h-36 overflow-hidden rounded-card sm:h-44">
                <SmartImage
                  src={promo.image}
                  alt={promo.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-300 ease-standard group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-lg font-bold tracking-tight text-ink">{promo.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{promo.copy}</p>
                <Link
                  to={promo.to}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-control bg-white px-3.5 py-2 text-sm font-semibold text-brand-green shadow-sm transition-colors duration-standard ease-standard hover:bg-brand-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  {promo.cta}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}