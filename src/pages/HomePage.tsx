import { HeroBanner } from '@/components/home/HeroBanner'
import { PromotionSection } from '@/components/home/PromotionSection'
import { HomeCategorySection } from '@/components/home/HomeCategorySection'
import { HomeProductSection } from '@/components/home/HomeProductSection'
import { StoreTrustSection } from '@/components/home/StoreTrustSection'

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <PromotionSection />
      </div>
      <HomeCategorySection />
      <HomeProductSection />
      <StoreTrustSection />
    </>
  )
}