import { useLayoutEffect, useRef, useState } from 'react'
import { UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { SearchBar } from '@/components/search/SearchBar'
import { DeliveryLocationSelector } from '@/components/location/DeliveryLocationSelector'
import { CartIndicator } from '@/components/cart/CartIndicator'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ServiceTrustStrip } from '@/components/layout/ServiceTrustStrip'

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false)
  const fixedRef = useRef<HTMLDivElement>(null)
  const [fixedHeight, setFixedHeight] = useState(0)

  useLayoutEffect(() => {
    const el = fixedRef.current
    if (!el) return
    const update = () => setFixedHeight(el.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div aria-hidden data-nav-spacer className="shrink-0" style={{ height: fixedHeight }} />
      <div ref={fixedRef} data-fixed-top className="fixed inset-x-0 top-0 z-40">
        <header className="border-b border-line bg-white/95 backdrop-blur">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1.5 py-3 sm:gap-3">
              <Logo size="md" className="mr-0.5 sm:mr-1" wordmarkClassName="hidden sm:inline" />

              <DeliveryLocationSelector />

              <div className="min-w-0 flex-1 lg:mx-2 lg:max-w-xl">
                <SearchBar />
              </div>

              <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/login"
                  className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-control text-sm font-semibold text-ink-secondary transition-colors duration-standard ease-standard hover:bg-surface-subtle hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange md:w-auto md:px-2.5"
                  aria-label="Login to your SKIMART account"
                >
                  <UserRound aria-hidden className="h-5 w-5" strokeWidth={2} />
                  <span className="hidden md:inline">Login</span>
                </Link>
                <CartIndicator onClick={() => setCartOpen(true)} />
              </div>
            </div>
          </div>
        </header>

        <ServiceTrustStrip />

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </>
  )
}