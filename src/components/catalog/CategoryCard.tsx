import { Link } from 'react-router-dom'
import type { Category } from '@/types'
import { SmartImage } from '@/components/ui/SmartImage'

interface CategoryCardProps {
  category: Category
  itemCount?: number
}

export function CategoryCard({ category, itemCount }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.slug}`}
      aria-label={`Shop ${category.name}`}
      className="group flex flex-col items-center gap-2 rounded-card p-2 text-center transition-colors duration-standard ease-standard hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
    >
      <div className="relative w-full overflow-hidden rounded-control bg-white">
        <div className="aspect-square w-full">
          <SmartImage
            src={category.image}
            alt={category.alt}
            className="h-full w-full rounded-control object-cover transition-transform duration-standard ease-standard group-hover:scale-105"
            fallbackSrc="/images/placeholder-product.svg"
          />
        </div>
      </div>
      <span className="line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors duration-standard group-hover:text-brand-green">
        {category.name}
      </span>
      {typeof itemCount === 'number' && (
        <span className="text-xs text-ink-muted">
          {itemCount} {itemCount === 1 ? 'product' : 'products'}
        </span>
      )}
    </Link>
  )
}