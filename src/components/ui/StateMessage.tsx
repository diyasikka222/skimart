import { Inbox, LoaderCircle, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from './Button'

interface StateMessageProps {
  type: 'empty' | 'loading' | 'error'
  title: string
  description?: string
  action?: ReactNode
}

export function StateMessage({ type, title, description, action }: StateMessageProps) {
  if (type === 'loading') {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-3 rounded-card border border-line bg-white p-10 text-ink-secondary"
      >
        <LoaderCircle aria-hidden className="h-8 w-8 animate-spin text-brand-green" />
        <p className="text-sm font-medium">{title}</p>
      </div>
    )
  }

  const Icon = type === 'error' ? TriangleAlert : Inbox

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-line bg-white p-10 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-pale">
        <Icon
          aria-hidden
          className="h-7 w-7 text-brand-green"
          strokeWidth={1.8}
        />
      </span>
      <div>
        <p className="text-base font-semibold text-ink">{title}</p>
        {description && (
          <p className="mt-1 max-w-md text-sm text-ink-secondary">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export function EmptyStateWithAction({
  title,
  description,
  actionLabel,
  actionTo,
}: {
  title: string
  description: string
  actionLabel: string
  actionTo: string
}) {
  return (
    <StateMessage
      type="empty"
      title={title}
      description={description}
      action={<Button to={actionTo} variant="secondary">{actionLabel}</Button>}
    />
  )
}