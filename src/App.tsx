import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import { HomePage } from '@/pages/HomePage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { ProductPage } from '@/pages/ProductPage'
import { SearchPage } from '@/pages/SearchPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { OrderDetailsPage } from '@/pages/OrderDetailsPage'
import { InfoPage } from '@/pages/InfoPage'
import { ContactPage } from '@/pages/ContactPage'
import { LoginPage } from '@/pages/LoginPage'
import { AccountPage } from '@/pages/AccountPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const titles: Record<string, string> = {
  '/': 'SKIMART — Everyday groceries, delivered from your local supermarket',
  '/categories': 'Shop by category — SKIMART',
  '/cart': 'Your shopping cart — SKIMART',
  '/checkout': 'Checkout — SKIMART',
  '/orders': 'My orders — SKIMART',
  '/search': 'Search — SKIMART',
  '/about': 'About — SKIMART',
  '/contact': 'Contact — SKIMART',
  '/faq': 'FAQs — SKIMART',
  '/delivery-information': 'Delivery information — SKIMART',
  '/privacy-policy': 'Privacy policy — SKIMART',
  '/terms-and-conditions': 'Terms & conditions — SKIMART',
  '/returns-and-refunds': 'Returns & refunds — SKIMART',
  '/login': 'Login — SKIMART',
  '/account': 'My account — SKIMART',
}

function RouteTitleSetter() {
  const location = useLocation()
  useEffect(() => {
    let title = titles[location.pathname]
    if (!title) {
      const segments = location.pathname.split('/').filter(Boolean)
      if (segments[0] === 'category')
        title = `${decodeURIComponent(segments[1] ?? '')} — SKIMART`
      else if (segments[0] === 'product')
        title = `${decodeURIComponent(segments[1] ?? '')} — SKIMART`
      else if (segments[0] === 'order-confirmation')
        title = `Order confirmed — SKIMART`
      else if (segments[0] === 'orders')
        title = `Order ${decodeURIComponent(segments[1] ?? '')} — SKIMART`
      else title = 'SKIMART'
    }
    document.title = title
  }, [location.pathname])
  return null
}

const infoRoutes = [
  'about',
  'faq',
  'delivery-information',
  'privacy-policy',
  'terms-and-conditions',
  'returns-and-refunds',
] as const

export default function App() {
  return (
    <>
      <RouteTitleSetter />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="account" element={<AccountPage />} />
          {infoRoutes.map((slug) => (
            <Route key={slug} path={slug} element={<InfoPage slug={slug} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}