import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'font-semibold text-ink' : 'text-ink-muted'}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-ink-secondary transition-colors hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-ink-muted" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}