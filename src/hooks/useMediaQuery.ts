import { useSyncExternalStore } from 'react'

/** Media query reactiva. En el prerender devuelve `serverValue`. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => (window.matchMedia ? window.matchMedia(query).matches : serverValue),
    () => serverValue,
  )
}
