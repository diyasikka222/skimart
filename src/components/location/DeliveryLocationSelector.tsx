import { ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useLocationStore } from '@/store/locationStore'
import { siteConfig } from '@/data/site'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

/**
 * Interactive delivery-location control.
 * Until a delivery-zone backend exists this stores the chosen locality locally
 * and makes no claim that deliveries are serviceable there.
 */
export function DeliveryLocationSelector() {
  const label = useLocationStore((s) => s.label)
  const pin = useLocationStore((s) => s.pin)
  const setLocation = useLocationStore((s) => s.setLocation)

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(label)
  const [pinDraft, setPinDraft] = useState(pin ?? '')

  function openDialog() {
    setDraft(label)
    setPinDraft(pin ?? '')
    setOpen(true)
  }

  function apply() {
    const trimmed = draft.trim()
    if (!trimmed) return
    const pinOnly = /^\d{6}$/.test(pinDraft.trim())
    setLocation(trimmed, pinOnly ? pinDraft.trim() : null)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="group inline-flex h-11 max-w-[220px] items-center gap-2 rounded-control px-2.5 transition-colors duration-standard ease-standard hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
        aria-label="Select delivery location"
      >
        <MapPin aria-hidden className="h-5 w-5 shrink-0 text-brand-orange" strokeWidth={2.2} />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">{label}</span>
          <span className="block text-[11px] leading-tight text-ink-muted">
            Home delivery {pin ? `· ${pin}` : 'available'}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-standard group-hover:text-ink-secondary"
        />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Choose delivery location">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            apply()
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="locality"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Locality or area
            </label>
            <input
              id="locality"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={siteConfig.defaultLocation}
              className="h-11 w-full rounded-control border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="pincode"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              PIN code <span className="text-ink-muted">(optional)</span>
            </label>
            <input
              id="pincode"
              value={pinDraft}
              onChange={(e) => setPinDraft(e.target.value)}
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="6-digit PIN"
              className="h-11 w-full rounded-control border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/25"
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
              Suggested
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.demoDeliveryPoints.map((point) => (
                <button
                  key={point.pin + point.locality}
                  type="button"
                  onClick={() => {
                    setDraft(point.locality)
                    setPinDraft(point.pin)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-subtle px-3 py-1.5 text-xs font-medium text-ink-secondary transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
                >
                  <MapPin aria-hidden className="h-3 w-3" />
                  {point.locality} · {point.pin}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={!draft.trim()}
          >
            Apply location
          </Button>

          <p className="text-center text-xs leading-relaxed text-ink-muted">
            Delivery availability is verified against store data once the
            service is live. Until then, this is a demonstration selection.
          </p>
        </form>
      </Modal>
    </>
  )
}