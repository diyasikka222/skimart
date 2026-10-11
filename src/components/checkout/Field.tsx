import {
  useId,
  type InputHTMLAttributes,
  type Ref,
  type TextareaHTMLAttributes,
} from 'react'

const inputBase =
  'w-full rounded-control border bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25'

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  hint?: string
  error?: string
  className?: string
  inputRef?: Ref<HTMLInputElement>
}

export function Field({ label, hint, error, className, inputRef, ...input }: FieldProps) {
  const id = useId()
  const invalid = Boolean(error)
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        {...input}
        aria-invalid={invalid}
        aria-describedby={
          invalid ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={`${inputBase} h-11 ${invalid ? 'border-state-error focus:border-state-error focus:ring-state-error/20' : 'border-line'}`}
      />
      {hint && !invalid && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {invalid && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-state-error">
          {error}
        </p>
      )}
    </div>
  )
}

interface FieldAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  error?: string
  className?: string
  areaRef?: Ref<HTMLTextAreaElement>
}

export function FieldArea({ label, error, className, areaRef, ...area }: FieldAreaProps) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={id}
        ref={areaRef}
        {...area}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputBase} min-h-24 resize-y py-2.5 ${
          error ? 'border-state-error focus:border-state-error focus:ring-state-error/20' : 'border-line'
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-state-error">
          {error}
        </p>
      )}
    </div>
  )
}