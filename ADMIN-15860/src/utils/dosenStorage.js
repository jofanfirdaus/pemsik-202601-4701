import { initialDosen } from '@/data/dosen'

const KEY = 'dosen'

export function getDosen() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // abaikan, pakai data awal
  }
  localStorage.setItem(KEY, JSON.stringify(initialDosen))
  return initialDosen
}

export function saveDosen(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}