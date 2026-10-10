import { PageContainer } from '@/components/ui/PageContainer'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <PageContainer className="py-16 lg:py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="text-6xl font-extrabold text-brand-orange">404</p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          The page you were looking for doesn’t exist or may have moved. Let’s get you
          back to the groceries.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" variant="primary" size="lg">
            Back to homepage
          </Button>
          <Button to="/categories" variant="ghost" size="lg">
            Browse categories
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}