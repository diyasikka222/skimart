import { Link } from 'react-router-dom'
import { assetUrls } from '@/data/assets'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Extra classes for the wordmark, e.g. to hide it on small screens. */
  wordmarkClassName?: string
}

const markPixelHeight = { sm: 30, md: 38, lg: 46 } as const

export function Logo({ size = 'md', className, wordmarkClassName }: LogoProps) {
  const text = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size]
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 rounded-lg ${className ?? ''}`}
      aria-label="SKIMART — go to homepage"
    >
      <img
        src={assetUrls.logo}
        alt=""
        aria-hidden="true"
        height={markPixelHeight[size]}
        style={{ height: markPixelHeight[size] }}
        className="w-auto shrink-0"
      />
      <span
        className={`font-extrabold tracking-tight text-[#388F46] ${text} ${wordmarkClassName ?? ''}`}
      >
        SKI<span className="text-[#F6951D]">MART</span>
      </span>
    </Link>
  )
}