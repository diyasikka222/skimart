import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { assetUrls } from '@/data/assets'

/**
 * First-visit welcome dialog.
 *
 * Shown once per browser session: the flag lives in sessionStorage, so it
 * appears the first time the store is opened and again after the tab/app is
 * closed and reopened, but not on every in-session navigation or reload.
 */
const SESSION_KEY = 'skimart.welcome.v1'

function hasSeenWelcome(): boolean {
  try {
    return typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function markWelcomeSeen(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Storage unavailable — the dialog simply reappears next time.
  }
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function WelcomeModal() {
  const [open, setOpen] = useState(() => !hasSeenWelcome())
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  function dismiss() {
    markWelcomeSeen()
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        markWelcomeSeen()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return
    const panel = panelRef.current
    if (!panel) return
    const nodes = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (nodes.length === 0) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-welcome-fade">
      <div
        data-welcome-backdrop
        className="absolute inset-0 bg-brand-green-deep/60 backdrop-blur-xl"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        data-welcome-dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapFocus}
        className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-card bg-white p-8 text-center shadow-[0_18px_50px_-12px_rgba(23,63,40,0.45)] outline-none animate-welcome-pop"
      >
        <img
          src={assetUrls.logo}
          alt=""
          aria-hidden="true"
          className="h-16 w-16"
        />
        <h1 id={titleId} className="mt-4 text-2xl font-extrabold text-ink">
          Welcome to <span className="text-[#F6951D]">SKIMART</span>
        </h1>
        <p className="mt-2 text-sm font-medium text-ink-secondary">
          Your local neighbourhood super mart
        </p>
        <Button size="lg" fullWidth className="mt-6" onClick={dismiss} autoFocus>
          Let&apos;s explore
        </Button>
      </div>
    </div>,
    document.body,
  )
}