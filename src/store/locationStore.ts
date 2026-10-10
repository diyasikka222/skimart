import { create } from 'zustand'
import { safeStorage, isLocationRecord } from '@/lib/safeStorage'
import { siteConfig } from '@/data/site'

const STORAGE_KEY = 'skimart.location.v1'

interface LocationState {
  label: string
  pin: string | null
  setLocation: (label: string, pin: string | null) => void
}

const stored = safeStorage.getValidated<{ label: string; pin: string | null }>(
  STORAGE_KEY,
  (v) => isLocationRecord(v),
)

export const useLocationStore = create<LocationState>((set) => ({
  label: stored?.label || siteConfig.defaultLocation,
  pin: stored?.pin ?? null,

  setLocation: (label, pin) => {
    safeStorage.setObject(STORAGE_KEY, { label, pin })
    set({ label, pin })
  },
}))