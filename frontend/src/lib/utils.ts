import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.map((input) => {
    if (typeof input === 'string') {
      return input
    }
    if (Array.isArray(input)) {
      return input.map((item) => (typeof item === 'string' ? item : '')).join(' ')
    }
    return ''
  }).join(' ').trim()
}
