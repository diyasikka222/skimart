import { Link, useParams } from 'react-router-dom'
import { PackageCheck, Truck } from 'lucide-react'
import { getCategory, getProduct, getRelatedProducts } from '@/services/catalog'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SmartImage } from '@/components/ui/SmartImage'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { DemoNotice } from '@/components/ui/DemoNotice'
import { CartControls } from '@/components/catalog/CartControls'
import { FavouriteButton } from '@/components/ui/FavouriteButton'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const product = getProduct(slug)

  if (!product) {
    return (
      <PageContainer className="py-12">
        <div className="rounded-card border border-line bg-white p-10 text-center">
          <p className="text-lg font-bold text-ink">Product not found</p>
          <p className="mt-2 text-sm text-ink-secondary">
            This product is not in the demonstration catalogue.
          </p>
          <div className="mt-5">
            <Button to="/categories" variant="secondary">
              Browse products
            </Button>
          </div>
        </div>
      </PageContainer>
    )
  }

  const category = getCategory(product.categorySlug)
  const related = getRelatedProducts(product, 4)

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          ...(category ? [{ label: category.name, to: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="relative">
          <div className="overflow-hidden rounded-card border border-line bg-surface-subtle">
            <SmartImage
              src={product.image}
              alt={product.alt}
              lazy={false}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                {product.brand}
              </span>
              <DemoNotice />
            </div>
            <FavouriteButton product={product} />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-ink-secondary">{product.unit}</p>

          <div className="mt-4">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink">About this product</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-secondary">
              {product.description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                product.inStock
                  ? 'bg-brand-green-pale text-state-success'
                  : 'bg-surface-subtle text-ink-muted'
              }`}
            >
              <PackageCheck aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              {product.inStock ? 'In stock' : 'Out of stock'}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-orange-deep">
              <Truck aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
              Home delivery
            </span>
          </div>

          <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <CartControls product={product} size="lg" />
          </div>

          <p className="mt-4 text-xs text-ink-muted">
            Prices shown are demonstration values until confirmed by the store. Delivery
            charges and availability are finalised at checkout.
          </p>

          {category && (
            <p className="mt-6 text-sm text-ink-secondary">
              Category:{' '}
              <Link
                to={`/category/${category.slug}`}
                className="font-semibold text-brand-green hover:underline"
              >
                {category.name}
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="mt-14">
        <SectionHeading title="You may also like" />
        <ProductGrid
          products={related}
          emptyTitle="More products coming soon"
          emptyDescription="The store is building out this part of the catalogue."
        />
      </div>
    </PageContainer>
  )
}