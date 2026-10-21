import { useMediaQuery } from './useMediaQuery'

/** Debajo de 1024px no hay pin ni scroll horizontal con JS. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 1023.98px)', true)
}
