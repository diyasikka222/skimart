import { MapPin } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { siteConfig } from '@/data/site'
import { PageContainer } from '@/components/ui/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/store/toastStore'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactPage() {
  const toast = useToast()
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!values.message.trim()) next.message = 'Please write a short message.'
    else if (values.message.trim().length < 10)
      next.message = 'Please write at least 10 characters.'
    return next
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    toast.success(
      'Your message was prepared for demonstration. It is not sent anywhere yet.',
      'Message received',
    )
    setValues({ name: '', email: '', message: '' })
  }

  const inputBase =
    'h-11 w-full rounded-control border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25'
  const textareaBase =
    'w-full rounded-control border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25'

  return (
    <PageContainer className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Contact SKIMART
          </h1>
          <p className="mt-3 max-w-lg text-base text-ink-secondary">
            Have a question about a product or the store? Reach us at the address below.
            Online contact will be connected once the store confirms its support channels.
          </p>

          <div className="mt-8 rounded-card border border-line bg-white p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-brand-green-pale">
              <MapPin aria-hidden className="h-5 w-5 text-brand-green" strokeWidth={2} />
            </span>
            <h2 className="mt-4 text-lg font-bold text-ink">
              {siteConfig.legalBusinessName}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              {siteConfig.addressLines[0]}
              <br />
              {siteConfig.addressLines[1]}
            </p>
            <p className="mt-4 border-t border-line pt-4 text-sm text-ink-muted">
              Store phone and email are not listed yet — they will appear here once
              confirmed by the store.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <h2 className="text-lg font-bold text-ink">Send us a message</h2>

          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="contact-name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className={inputBase}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              autoComplete="name"
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-state-error">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              className={inputBase}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-state-error">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              className={textareaBase}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" role="alert" className="mt-1.5 text-sm text-state-error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="mt-2">
            <Button type="submit" size="lg">
              Send message
            </Button>
            <p className="mt-3 text-xs text-ink-muted">
              Demonstration form — nothing is submitted anywhere yet.
            </p>
          </div>
        </form>
      </div>
    </PageContainer>
  )
}