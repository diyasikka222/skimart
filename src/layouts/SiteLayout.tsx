import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Toaster } from '@/components/ui/Toaster'
import { WelcomeModal } from '@/components/ui/WelcomeModal'

/** Reset scroll position on navigation (respects reduced-motion). */
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])
  return null
}

export function SiteLayout() {
  return (
    <div className="isolate flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Toaster />
      <WelcomeModal />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}