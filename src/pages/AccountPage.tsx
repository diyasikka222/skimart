import { UserRound } from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'

const upcoming = [
  'Orders and order history',
  'Saved delivery addresses',
  'Faster checkout',
  'Favourites synced across devices',
]

export function AccountPage() {
  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My account' }]} />

      <div className="mx-auto mt-6 max-w-md">
        <div className="rounded-card border border-line bg-white p-8 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-pale">
            <UserRound aria-hidden className="h-8 w-8 text-brand-green" strokeWidth={1.8} />
          </span>
          <h1 className="mt-5 text-xl font-extrabold tracking-tight text-ink">
            You are not signed in
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            Customer accounts arrive in a later phase. Sign in is not available yet, so
            there is no account activity to show here.
          </p>
          <div className="mt-6">
            <Button to="/login" variant="primary" size="lg" fullWidth>
              Preview the login page
            </Button>
          </div>
          <div className="mt-3">
            <Button to="/orders" variant="ghost" fullWidth>
              View my demo orders
            </Button>
          </div>

          <div className="mt-6 border-t border-line pt-5 text-left">
            <p className="text-sm font-semibold text-ink">Account features planned</p>
            <ul className="mt-3 space-y-2">
              {upcoming.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <Button to="/categories" variant="secondary" fullWidth>
              Browse products
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}