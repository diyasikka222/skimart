import { Heart } from 'lucide-react'
import type { Product } from '@/types'
import { useFavouritesStore } from '@/store/favouritesStore'
import { useToast } from '@/store/toastStore'

interface FavouriteButtonProps {
  product: Product
  size?: 'sm' | 'md'
}

export function FavouriteButton({ product, size = 'md' }: FavouriteButtonProps) {
  const toggle = useFavouritesStore((s) => s.toggle)
  const isFavourite = useFavouritesStore((s) => s.ids.includes(product.id))
  const toast = useToast()

  const btnSize = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10'
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'

  return (
    <button
      type="button"
      onClick={() => {
        toggle(product.id)
        toast.info(
          isFavourite
            ? `${product.name} removed from your favourites.`
            : `${product.name} saved to favourites.`,
          isFavourite ? 'Removed' : 'Favourited',
        )
      }}
      aria-pressed={isFavourite}
      aria-label={
        isFavourite
          ? `Remove ${product.name} from favourites`
          : `Add ${product.name} to favourites`
      }
      className={`inline-flex items-center justify-center rounded-full border transition-all duration-standard ease-standard focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange ${btnSize} ${
        isFavourite
          ? 'border-brand-orange-tint bg-brand-orange-tint text-brand-orange-deep'
          : 'border-line bg-white text-ink-muted hover:border-brand-orange-tint hover:bg-brand-orange-tint hover:text-brand-orange-deep'
      }`}
    >
      <Heart
        aria-hidden
        className={iconSize}
        fill={isFavourite ? 'currentColor' : 'none'}
        strokeWidth={2}
      />
    </button>
  )
}