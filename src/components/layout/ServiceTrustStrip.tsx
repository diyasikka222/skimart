import { BadgePercent, Home, Truck } from 'lucide-react'

const items = [
  {
    icon: Home,
    label: 'Neighbourhood supermarket',
  },
  {
    icon: BadgePercent,
    label: 'Fair, everyday prices',
  },
  {
    icon: Truck,
    label: 'Order online, get it delivered home',
  },
]

interface StripItemProps {
  icon: (typeof items)[number]['icon']
  label: string
  duplicate?: boolean
}

function StripItem({ icon: Icon, label, duplicate }: StripItemProps) {
  return (
    <span
      data-marquee-item
      aria-hidden={duplicate ? 'true' : undefined}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] font-medium text-white sm:text-sm"
    >
      <Icon aria-hidden className="h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />
      {label}
      <span aria-hidden="true" className="px-1 text-brand-orange/70">
        •
      </span>
    </span>
  )
}

export function ServiceTrustStrip() {
  return (
    <div data-service-strip className="border-b border-brand-green bg-brand-green-deep shadow-sm">
      {/* Mobile: single-line announcement ticker */}
      <div data-strip-mobile className="sm:hidden">
        <div
          data-strip-viewport
          className="flex overflow-hidden py-2.5 motion-reduce:overflow-x-auto motion-reduce:scrollbar-thin"
        >
          <div
            data-strip-track
            className="flex w-max animate-marquee items-center hover:[animation-play-state:paused] motion-reduce:animate-none"
          >
            {items.map((item) => (
              <StripItem key={item.label} icon={item.icon} label={item.label} />
            ))}
            {items.map((item) => (
              <StripItem key={`dup-${item.label}`} icon={item.icon} label={item.label} duplicate />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet and up: static single row */}
      <div
        data-strip-desktop
        className="mx-auto hidden w-full max-w-container px-4 sm:px-6 lg:px-8 sm:block"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 py-3 sm:justify-between">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white sm:text-sm"
              >
                <Icon aria-hidden className="h-4 w-4 text-brand-orange" strokeWidth={2.2} />
                {item.label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}