import { Plus } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/store/toastStore'
import { formatPrice } from '@/lib/format'

interface AddToCartButtonProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
}

export function AddToCartButton({ product, size = 'md' }: AddToCartButtonProps) {
  const add = useCartStore((s) => s.add)
  const toast = useToast()
  const inCart = useCartStore((s) => s.items[product.id] ?? 0)

  const sizeClasses = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }[size]

  if (inCart > 0) {
    return (
<div className="w-full rounded-control bg-brand-green px-3 py-1 text-center font-bold text-white shadow-sm">
      {inCart} in cart
    </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(product.id)
        toast.success(`${product.name} (${product.unit}) added to your cart.`)
      }}
      className={`inline-flex w-full items-center justify-center gap-1.5 rounded-control bg-brand-orange font-semibold text-white transition-[background-color,transform] duration-standard ease-standard hover:bg-brand-orange-deep active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${sizeClasses}`}
      aria-label={`Add ${product.name} to cart`}
    >
      <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
      <span>
        Add · {formatPrice(product.price)}
      </span>
    </button>
  )
}