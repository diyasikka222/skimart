import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { SortOption } from '@/types'
import { searchProductsQuery, sortProducts } from '@/services/catalog'
import { SearchBar } from '@/components/search/SearchBar'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { SortSelect } from '@/components/catalog/SortSelect'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { StateMessage } from '@/components/ui/StateMessage'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { ArrowRight } from 'lucide-react'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()
  const [sort, setSort] = useState<SortOption>('popular')

  useEffect(() => {
    setSort('popular')
  }, [query])

  const raw = searchProductsQuery({ q: query })
  const results = sortProducts(raw, sort)

  const noQuery = query.length === 0

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
      />

      <div className="mt-4 max-w-2xl">
        <SearchBar key={query} initialValue={query} autoFocus={query.length === 0} variant="page" />
      </div>

      <div className="mt-8">
        {noQuery ? (
          <StateMessage
            type="empty"
            title="Search the catalogue"
            description="Type a product, brand, or category name above — for example “milk”, “Amul”, or “snacks”."
          />
        ) : results.length === 0 ? (
          <StateMessage
            type="empty"
            title={`No results for “${query}”`}
            description="Check the spelling, try a broader term, or browse by category instead."
            action={
              <Link
                to="/categories"
                className="inline-flex h-11 items-center gap-2 rounded-control bg-brand-green px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              >
                Browse categories <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            }
          />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                  Results for “{query}”
                </h1>
                <p className="mt-1 text-sm text-ink-secondary">
                  {results.length} {results.length === 1 ? 'product' : 'products'} found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <DemoNotice />
                <SortSelect id="sort-search" value={sort} onChange={setSort} />
              </div>
            </div>

            <ProductGrid
              products={results}
              emptyTitle="No results"
              emptyDescription="Nothing matched your search."
            />
          </>
        )}
      </div>
    </PageContainer>
  )
}