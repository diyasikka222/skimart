import { LockKeyhole } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/ui/PageContainer'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/store/toastStore'

interface LoginErrors {
  email?: string
  password?: string
}

export function LoginPage() {
  const toast = useToast()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: LoginErrors = {}
    if (!values.email.trim()) next.email = 'Please enter your email.'
    if (!values.password.trim()) next.password = 'Please enter your password.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    toast.info(
      'Sign-in launches in a later phase. Nothing was stored.',
      'Accounts coming soon',
    )
  }

  const inputBase =
    'h-11 w-full rounded-control border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25'

  return (
    <PageContainer className="py-10 lg:py-14">
      <div className="mx-auto max-w-md">
        <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-control bg-brand-green-pale">
            <LockKeyhole aria-hidden className="h-6 w-6 text-brand-green" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
            Login to SKIMART
          </h1>
          <p className="mt-2 text-sm text-ink-secondary">
            Customer accounts are coming in a later phase. This form is a preview and
            does not create or sign into any account.
          </p>

          <form onSubmit={submit} className="mt-6 flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                className={inputBase}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
              />
              {errors.email && (
                <p id="login-email-error" role="alert" className="mt-1.5 text-sm text-state-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={values.password}
                onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
                className={inputBase}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />
              {errors.password && (
                <p id="login-password-error" role="alert" className="mt-1.5 text-sm text-state-error">
                  {errors.password}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" fullWidth>
              Preview login
            </Button>
          </form>

          <div className="mt-6 border-t border-line pt-4 text-center">
            <p className="text-sm text-ink-secondary">
              New to SKIMART?{' '}
              <Link
                to="/categories"
                className="font-semibold text-brand-green hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
              >
                Start shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}