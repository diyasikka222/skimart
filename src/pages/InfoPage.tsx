import { useLocation } from 'react-router-dom'
import { infoPages } from '@/data/pages'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'

interface InfoPageProps {
  slug?: string
}

export function InfoPage({ slug: slugProp }: InfoPageProps) {
  const { pathname } = useLocation()
  const slug = slugProp ?? pathname.split('/').filter(Boolean)[0] ?? ''
  const content = infoPages[slug]

  if (!content) {
    return (
      <PageContainer className="py-12">
        <div className="rounded-card border border-line bg-white p-10 text-center">
          <p className="text-lg font-bold text-ink">Page not found</p>
          <p className="mt-2 text-sm text-ink-secondary">That page does not exist.</p>
          <div className="mt-5">
            <Button to="/" variant="secondary">Back to homepage</Button>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: content.title }]} />
      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {content.title}
        </h1>
        <p className="mt-3 text-base text-ink-secondary">{content.description}</p>

        <div className="mt-8 flex flex-col gap-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-bold text-ink">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-2 leading-relaxed text-ink-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}