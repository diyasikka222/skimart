import { ShoppingCart } from 'lucide-react'
import { selectCartCount, useCartStore } from '@/store/cartStore'

interface CartIndicatorProps {
  onClick: () => void
}

export function CartIndicator({ onClick }: CartIndicatorProps) {
  const count = useCartStore(selectCartCount)

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      className="relative inline-flex h-11 items-center gap-2 rounded-control border border-line bg-white px-3 transition-colors duration-standard ease-standard hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
    >
      <ShoppingCart aria-hidden className="h-5 w-5 text-ink-secondary" strokeWidth={2} />
      <span className="hidden text-sm font-semibold text-ink md:inline">Cart</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-xs font-bold text-white shadow-sm"
        >
          {count}
        </span>
      )}
    </button>
  )
}