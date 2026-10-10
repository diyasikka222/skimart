import { getCategories } from '@/services/catalog'
import { CategoryCard } from '@/components/catalog/CategoryCard'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageTitle } from '@/components/ui/PageTitle'

export function CategoriesPage() {
  const list = getCategories()

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Categories' }]} />
      <div className="mt-2">
        <PageTitle
          title="Shop by category"
          description="Browse the whole store by department and find what your home needs."
        />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-x-2 gap-y-6 min-[420px]:grid-cols-4 sm:gap-x-3 md:grid-cols-5 lg:grid-cols-8">
        {list.map((category) => (
          <CategoryCard key={category.slug} category={category} itemCount={category.itemCount} />
        ))}
      </div>
    </PageContainer>
  )
}