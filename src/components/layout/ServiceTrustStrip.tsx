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

export function ServiceTrustStrip() {
  return (
    <div className="border-b border-brand-green-pale bg-brand-green-pale/70">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 py-3 sm:justify-between">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-brand-green-deep sm:text-sm"
              >
                <Icon aria-hidden className="h-4 w-4 text-brand-green" strokeWidth={2.2} />
                {item.label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}