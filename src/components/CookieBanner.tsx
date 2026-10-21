import { useEffect, useRef, useSyncExternalStore } from 'react'
import {
  bannerSnapshot,
  consumeFocusRequest,
  restoreConsent,
  setConsent,
  subscribeBanner,
} from '../lib/consent'
import { Label } from './ui/Label'

/** Banner de cookies: cuadrado, sobrio, Aceptar y Rechazar al mismo nivel. No bloquea la página. */
export function CookieBanner() {
  const open = useSyncExternalStore(subscribeBanner, bannerSnapshot, () => false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    restoreConsent()
  }, [])

  useEffect(() => {
    if (open && consumeFocusRequest()) ref.current?.querySelector('button')?.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Preferencias de cookies"
      className="theme-negro fixed inset-x-(--spacing-gutter) bottom-(--spacing-gutter) z-60 border border-(--theme-fg) p-6 sm:right-auto sm:max-w-md"
    >
      <Label as="p" muted className="mb-3">
        Cookies
      </Label>
      <p className="text-small">
        Usamos cookies de analítica (Google Analytics) para saber cómo se usa el sitio. Solo se
        activan si aceptás. Más información en{' '}
        <a href="/cookies" className="link-line">
          la política de cookies
        </a>
        .
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button type="button" className="btn" onClick={() => setConsent('denied')}>
          Rechazar
        </button>
        <button type="button" className="btn" onClick={() => setConsent('granted')}>
          Aceptar
        </button>
      </div>
    </div>
  )
}
