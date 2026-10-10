import { Minus, Plus } from 'lucide-react'

interface QuantityControlProps {
  value: number
  onDecrease: () => void
  onIncrease: () => void
  size?: 'sm' | 'md'
  max?: number
  label?: string
}

export function QuantityControl({
  value,
  onDecrease,
  onIncrease,
  size = 'md',
  max = 99,
  label = 'Quantity',
}: QuantityControlProps) {
  const compact = size === 'sm'
  const btn = `inline-flex items-center justify-center ${
    compact ? 'h-7 w-7' : 'h-9 w-9'
  } rounded-control text-brand-green transition-colors duration-standard ease-standard hover:bg-brand-green-pale focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange disabled:opacity-40 disabled:hover:bg-transparent`

  return (
    <div
      className={`inline-flex items-center rounded-control border border-brand-green bg-white shadow-sm ${
        compact ? 'h-8' : 'h-10'
      }`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={btn}
        onClick={onDecrease}
        disabled={value <= 1}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
      </button>
      <span
        aria-live="polite"
        className={`min-w-8 text-center font-bold text-brand-green-deep ${
          compact ? 'text-sm' : 'text-base'
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={onIncrease}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  )
}