import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { SearchBar } from '@/components/search/SearchBar'
import { DeliveryLocationSelector } from '@/components/location/DeliveryLocationSelector'
import { CartIndicator } from '@/components/cart/CartIndicator'
import { CartDrawer } from '@/components/cart/CartDrawer'

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-3 sm:gap-3">
          <Logo size="md" className="mr-1" />

          <div className="hidden lg:block">
            <DeliveryLocationSelector />
          </div>

          <div className="min-w-0 flex-1 lg:mx-2 lg:max-w-xl">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/login"
              className="inline-flex h-11 items-center gap-2 rounded-control px-2.5 text-sm font-semibold text-ink-secondary transition-colors duration-standard ease-standard hover:bg-surface-subtle hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
              aria-label="Login to your SKIMART account"
            >
              <UserRound aria-hidden className="h-5 w-5" strokeWidth={2} />
              <span className="hidden md:inline">Login</span>
            </Link>
            <CartIndicator onClick={() => setCartOpen(true)} />
          </div>
        </div>

        <div className="pb-3 lg:hidden">
          <DeliveryLocationSelector />
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}