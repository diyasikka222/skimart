/**
 * Safe localStorage wrapper. Catches quota errors, malformed JSON and stale
 * shapes so stored demo state can never break the app.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const mode: 'storage' | 'memory' =
  typeof window !== 'undefined' && window.localStorage ? 'storage' : 'memory'

const memoryStore = new Map<string, string>()

export const safeStorage = {
  getObject<T>(key: string): T | null {
    try {
      if (mode === 'memory') {
        const raw = memoryStore.get(key)
        return raw ? (JSON.parse(raw) as T) : null
      }
      const raw = window.localStorage.getItem(key)
      if (!raw) return null
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  /** Reads a persisted object and only returns it when it matches the expected shape. */
  getValidated<T extends Record<string, unknown>>(
    key: string,
    validate: (value: Record<string, unknown>) => boolean,
  ): T | null {
    const value = this.getObject<T>(key)
    if (value === null) return null
    if (!isPlainObject(value)) return null
    if (!validate(value)) return null
    return value as T
  },

  setObject(key: string, value: unknown): void {
    try {
      const raw = JSON.stringify(value)
      if (mode === 'memory') {
        memoryStore.set(key, raw)
        return
      }
      window.localStorage.setItem(key, raw)
    } catch {
      // Storage full or unavailable — leave state in memory only.
    }
  },

  remove(key: string): void {
    try {
      if (mode === 'memory') {
        memoryStore.delete(key)
        return
      }
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
  },
}

export function isRecordOfIdToQuantity(value: unknown): value is Record<string, number> {
  return isPlainObject(value) && Object.values(value).every((q) => typeof q === 'number')
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string')
}

export function isLocationRecord(value: unknown): value is {
  label: string
  pin: string | null
} {
  return (
    isPlainObject(value) &&
    typeof value.label === 'string' &&
    (value.pin === null || typeof value.pin === 'string')
  )
}