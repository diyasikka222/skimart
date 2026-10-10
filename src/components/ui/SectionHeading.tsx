import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  actionLabel?: string
  actionTo?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  title,
  subtitle,
  actionLabel,
  actionTo,
  align = 'left',
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-6 flex flex-wrap items-end justify-between gap-3 ${
        align === 'center' ? 'text-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'mx-auto' : ''}>
        <h2
          id={id}
          className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-ink-secondary">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-1.5 rounded-control px-2.5 py-1.5 text-sm font-semibold text-brand-green transition-colors duration-standard ease-standard hover:bg-brand-green-pale focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
        >
          {actionLabel}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}