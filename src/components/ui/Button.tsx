import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'soft'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  to?: string
  children: ReactNode
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-deep shadow-sm active:scale-[0.99]',
  secondary:
    'bg-brand-green text-white hover:bg-brand-green-deep active:scale-[0.99]',
  ghost:
    'border border-line bg-white text-brand-green hover:border-brand-green hover:bg-brand-green-pale',
  soft: 'bg-brand-green-pale text-brand-green-deep hover:bg-brand-green',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
}

const base =
  'inline-flex items-center justify-center rounded-control font-semibold transition-[background-color,box-shadow,transform] duration-standard ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:pointer-events-none disabled:opacity-50'

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  to,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${
    className ?? ''
  }`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}