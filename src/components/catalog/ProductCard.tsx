import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { SmartImage } from '@/components/ui/SmartImage'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { FavouriteButton } from '@/components/ui/FavouriteButton'
import { CartControls } from './CartControls'
import { DemoNotice } from '@/components/ui/DemoNotice'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-line bg-white p-3 transition-all duration-standard ease-standard hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-card">
      <div className="relative">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="block overflow-hidden rounded-card bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <SmartImage
            src={product.image}
            alt={product.alt}
            className="aspect-square w-full object-cover transition-transform duration-300 ease-standard group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute right-2 top-2">
          <FavouriteButton product={product} size="sm" />
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
          {product.brand}
        </p>
        <h3 className="mt-0.5 text-sm font-semibold leading-snug text-ink">
          <Link
            to={`/product/${product.slug}`}
            className="hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-ink-muted">{product.unit}</p>

        {product.isDemo && <DemoNotice className="mt-2 self-start" />}

        <div className="mt-auto pt-3">
          <div className="mb-2">
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
            />
          </div>
          <CartControls product={product} size="sm" />
        </div>
      </div>
    </article>
  )
}