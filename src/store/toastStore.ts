import { create } from 'zustand'
import type { ToastMessage } from '@/types'

interface ToastState {
  toasts: ToastMessage[]
  push: (toast: Omit<ToastMessage, 'id'>) => void
  dismiss: (id: string) => void
}

let counter = 0

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  push: (toast) => {
    const id = `toast-${Date.now()}-${counter++}`
    set((state) => ({ toasts: [...state.toasts.slice(-3), { ...toast, id }] }))
    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 3200)
  },

  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

export function useToast() {
  const push = useToastStore((s) => s.push)
  return {
    success: (description: string, title = 'Done') =>
      push({ title, description, tone: 'success' }),
    error: (description: string, title = 'Something went wrong') =>
      push({ title, description, tone: 'error' }),
    info: (description: string, title = 'Heads up') =>
      push({ title, description, tone: 'info' }),
  }
}