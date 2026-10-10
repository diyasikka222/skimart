import { getCategories } from '@/services/catalog'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CategoryCard } from '@/components/catalog/CategoryCard'
import { PageContainer } from '@/components/ui/PageContainer'

export function HomeCategorySection() {
  const list = getCategories()

  return (
    <section aria-labelledby="home-categories-heading" className="mt-10 lg:mt-14">
      <PageContainer>
        <SectionHeading
          id="home-categories-heading"
          title="Shop by category"
          subtitle="What are you looking for today?"
          actionLabel="View all categories"
          actionTo="/categories"
        />
        <div className="grid grid-cols-3 gap-x-2 gap-y-5 min-[420px]:grid-cols-4 sm:gap-x-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
          {list.map((category) => (
            <CategoryCard key={category.slug} category={category} itemCount={category.itemCount} />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}