import { formatPrice } from '@/lib/format'

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceDisplay({
  price,
  originalPrice,
  size = 'md',
  className,
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }[size]
  const originalSize = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  }[size]

  return (
    <div className={`flex items-baseline gap-1.5 ${className ?? ''}`}>
      <span className={`font-bold text-ink ${sizeClasses}`}>{formatPrice(price)}</span>
      {originalPrice !== undefined && originalPrice > price && (
        <span className={`font-medium text-ink-muted line-through ${originalSize}`}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  )
}