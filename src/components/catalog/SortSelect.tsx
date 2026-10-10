import { ChevronDown } from 'lucide-react'
import type { SortOption } from '@/types'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
  label?: string
  id: string
}

const options: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
]

export function SortSelect({ value, onChange, label = 'Sort by', id }: SortSelectProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink-secondary">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as SortOption)}
          className="h-10 appearance-none rounded-control border border-line bg-white pl-3 pr-9 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        />
      </div>
    </div>
  )
}