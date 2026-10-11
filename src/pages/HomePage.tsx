import { HeroBanner } from '@/components/home/HeroBanner'
import { PromotionSection } from '@/components/home/PromotionSection'
import { HomeCategorySection } from '@/components/home/HomeCategorySection'
import { HomeProductSection } from '@/components/home/HomeProductSection'
import { StoreTrustSection } from '@/components/home/StoreTrustSection'
import { assetUrls } from '@/data/assets'

export function HomePage() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        data-landing-bg
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${assetUrls.heroSunsetBackground}")` }}
      />
      <HeroBanner />
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <PromotionSection />
      </div>
      <HomeCategorySection />
      <HomeProductSection />
      <StoreTrustSection />
    </div>
  )
}