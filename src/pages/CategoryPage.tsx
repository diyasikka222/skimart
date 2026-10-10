import { Link, useParams } from 'react-router-dom'
import { getCategory } from '@/services/catalog'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { SortSelect } from '@/components/catalog/SortSelect'
import { useSortedProducts } from '@/components/catalog/useSortedProducts'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { DemoNotice } from '@/components/ui/DemoNotice'

export function CategoryPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const category = getCategory(slug)
  const { items, sort, setSort } = useSortedProducts(slug)

  if (!category) {
    return (
      <PageContainer className="py-12">
        <div className="rounded-card border border-line bg-white p-10 text-center">
          <p className="text-lg font-bold text-ink">Category not found</p>
          <p className="mt-2 text-sm text-ink-secondary">
            The category you are looking for does not exist.
          </p>
          <div className="mt-5">
            <Button to="/categories" variant="secondary">
              Browse all categories
            </Button>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Categories', to: '/categories' },
          { label: category.name },
        ]}
      />

      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-card lg:h-52 lg:w-80">
          <img
            src={category.image}
            alt={category.alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-secondary sm:text-base">
            {category.description}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            {category.itemCount} {category.itemCount === 1 ? 'product' : 'products'}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <DemoNotice />
            <Link
              to="/categories"
              className="text-sm font-semibold text-brand-green underline-offset-4 hover:underline"
            >
              All categories
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <SortSelect
          id={`sort-${category.slug}`}
          value={sort}
          onChange={setSort}
        />
      </div>

      <div className="mt-4">
        <ProductGrid
          products={items}
          emptyTitle={`No products in ${category.name} yet`}
          emptyDescription="The store is still confirming its catalogue for this section."
        >
          <Button to="/categories" variant="secondary">
            Browse other categories
          </Button>
        </ProductGrid>
      </div>
    </PageContainer>
  )
}