import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'
import { createPortal } from 'react-dom'

const toneStyles = {
  success: 'border-state-success/20 text-state-success',
  error: 'border-state-error/20 text-state-error',
  info: 'border-brand-orange/20 text-brand-green',
} as const

const toneIcon = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
} as const

function ToastPanel() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:pr-6 sm:pb-6"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon = toneIcon[toast.tone]
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-card border bg-white p-4 shadow-popover ${toneStyles[toast.tone]}`}
          >
            <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.2} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-sm text-ink-secondary">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-ink-muted transition-colors duration-standard hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export function Toaster() {
  return createPortal(<ToastPanel />, document.body)
}