import { Info } from 'lucide-react'

/**
 * Small flag shown next to demonstration data so it is never mistaken
 * for verified store information.
 */
export function DemoNotice({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-brand-orange-tint px-2 py-0.5 text-[11px] font-semibold text-brand-orange-deep ${className ?? ''}`}
      title="Demonstration catalogue data — price not yet confirmed by the store"
    >
      <Info aria-hidden className="h-3 w-3" strokeWidth={2.5} />
      Demo pricing
    </span>
  )
}