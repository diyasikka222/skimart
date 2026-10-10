import { getPopularProducts } from '@/services/catalog'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { PageContainer } from '@/components/ui/PageContainer'
import { DemoNotice } from '@/components/ui/DemoNotice'

export function HomeProductSection() {
  const products = getPopularProducts(8)

  return (
    <section aria-labelledby="favourites-heading" className="mt-10 lg:mt-14">
      <PageContainer>
        <SectionHeading
          id="favourites-heading"
          title="Everyday favourites"
          subtitle="The products your family reaches for, week after week."
          actionLabel="View more"
          actionTo="/categories"
        />
        <div className="mb-4">
          <DemoNotice />
        </div>
        <ProductGrid
          products={products}
          emptyTitle="Favourites coming soon"
          emptyDescription="Check back once the store confirms its catalogue."
        />
      </PageContainer>
    </section>
  )
}