import { getCategories } from '@/services/catalog'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CategoryCard } from '@/components/catalog/CategoryCard'
import { PageContainer } from '@/components/ui/PageContainer'

export function HomeCategorySection() {
  const list = getCategories()

  return (
    <section aria-labelledby="home-categories-heading" className="mt-10 lg:mt-14">
      <PageContainer>
        <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
          <SectionHeading
            id="home-categories-heading"
            title="Shop by category"
            subtitle="What are you looking for today?"
            actionLabel="View all categories"
            actionTo="/categories"
          />
          <div data-category-grid className="grid grid-cols-4 gap-x-2 gap-y-5 sm:gap-x-3 md:grid-cols-8">
            {list.map((category) => (
              <CategoryCard key={category.slug} category={category} itemCount={category.itemCount} />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}