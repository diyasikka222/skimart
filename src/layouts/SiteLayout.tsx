import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { ServiceTrustStrip } from '@/components/layout/ServiceTrustStrip'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Toaster } from '@/components/ui/Toaster'

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
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Toaster />
      <SiteHeader />
      <ServiceTrustStrip />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}