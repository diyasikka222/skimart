import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { siteConfig } from '@/data/site'
import { categories } from '@/data/categories'

const usefulLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Products', to: '/categories' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Returns & Refunds', to: '/returns-and-refunds' },
  { label: 'Delivery Information', to: '/delivery-information' },
]

const shoppingLinks = [
  { label: 'Fresh Produce', to: '/category/fruits-vegetables' },
  { label: 'Dairy & Eggs', to: '/category/dairy-eggs' },
  { label: 'Atta, Rice & Dal', to: '/category/atta-rice-dal' },
  { label: 'Snacks & Namkeen', to: '/category/snacks-namkeen' },
  { label: 'Household Essentials', to: '/category/home-cleaning' },
  { label: 'Personal Care', to: '/category/personal-care' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface-secondary">
      <div className="mx-auto w-full max-w-container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-secondary">
              {siteConfig.brandName} is a neighbourhood supermarket bringing everyday
              groceries, trusted brands and fair prices to your home.
            </p>
            <p className="mt-4 text-sm">
              <span className="font-semibold text-ink">{siteConfig.legalBusinessName}</span>
              <br />
              <span className="text-ink-secondary">
                {siteConfig.addressLines[0]}
                <br />
                {siteConfig.addressLines[1]}
              </span>
            </p>
          </div>

          <nav aria-label="Useful links">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              Useful Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-secondary transition-colors hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Shopping categories">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              Shopping
            </h3>
            <ul className="mt-4 space-y-2.5">
              {shoppingLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-secondary transition-colors hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/categories"
                  className="text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-deep focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                >
                  All categories
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              Top Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-ink-secondary transition-colors hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalBusinessName}. All rights reserved.
          </p>
          <p>
            Demonstration storefront — catalogue prices are placeholders until
            confirmed by the store.
          </p>
        </div>
      </div>
    </footer>
  )
}