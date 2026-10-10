import { Link } from 'react-router-dom'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const markId = 'skimart-logo-mark'

function Mark({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const px = { sm: 30, md: 38, lg: 46 }[size]
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="14" fill="#173F28" />
      <path d="M14 42h36a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V44a2 2 0 0 1 2-2Z" fill="#EEF5E8" />
      <path d="M14 42h36a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6a6 6 0 0 1-6-6H22a6 6 0 0 1-6 6a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2Z" fill="#3C7948" />
      <path d="M17 42l3-12h24l3 12" fill="none" stroke="#245C38" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="27" cy="22" r="3" fill="#F28C28" />
      <ellipse cx="24" cy="18" rx="4" ry="2.4" transform="rotate(-20 24 18)" fill="#3C7948" />
      <ellipse cx="34" cy="20" rx="4.4" ry="2.6" transform="rotate(14 34 20)" fill="#3C7948" />
    </svg>
  )
}

export function Logo({ size = 'md', className }: LogoProps) {
  const text = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size]
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 rounded-lg ${className ?? ''}`}
      aria-label="SKIMART — go to homepage"
    >
      <Mark size={size} />
      <span className={`font-extrabold tracking-tight text-brand-green-deep ${text}`}>
        SKI<span className="text-brand-orange">MART</span>
      </span>
      <span id={markId} className="sr-only">
        SKIMART
      </span>
    </Link>
  )
}