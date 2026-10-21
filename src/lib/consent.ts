// Consentimiento de cookies (Ley 25.326) + GA4 con Consent Mode v2.
// Regla: no se carga ningún script de Google hasta que la persona acepta.

export type Consent = 'granted' | 'denied'

const KEY = 'consent:v1'

/** ID de GA4 (G-XXXX). [PENDIENTE] Definir VITE_GA_ID en el hosting. Sin ID no se carga nada. */
export const GA_ID: string | undefined = import.meta.env.VITE_GA_ID || undefined

/** El banner solo tiene sentido si hay algo que consentir (en dev se muestra para revisarlo). */
export const consentNeeded = () => Boolean(GA_ID) || import.meta.env.DEV

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

// Estado del banner como store externo (lo lee CookieBanner con useSyncExternalStore).
let bannerOpen: boolean | null = null
let focusRequested = false
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

export function subscribeBanner(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function bannerSnapshot(): boolean {
  if (bannerOpen === null) bannerOpen = consentNeeded() && getConsent() === null
  return bannerOpen
}

/** Vuelve a mostrar el banner (link "Preferencias de cookies" del footer) y le da el foco. */
export function openConsent() {
  bannerOpen = true
  focusRequested = true
  notify()
}

/** true una sola vez después de openConsent(): el banner toma el foco. */
export function consumeFocusRequest() {
  const v = focusRequested
  focusRequested = false
  return v
}

export function setConsent(value: Consent) {
  bannerOpen = false
  notify()
  try {
    localStorage.setItem(KEY, value)
  } catch {
    // Sin almacenamiento: la elección vale para esta visita.
  }
  if (value === 'granted') loadAnalytics()
  else revokeAnalytics()
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

let loaded = false

export function loadAnalytics() {
  if (loaded || !GA_ID || typeof window === 'undefined') return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag necesita el objeto `arguments` tal cual.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  // Consent Mode v2: solo analítica; nada de publicidad.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)
}

export function revokeAnalytics() {
  if (typeof window === 'undefined') return
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  // Borra las cookies de GA del dominio (_ga, _ga_XXXX).
  const host = location.hostname.replace(/^www\./, '')
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (!name.startsWith('_ga')) return
    for (const domain of ['', `; domain=.${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  })
}

/** Al cargar la página: si ya había aceptado, se carga GA. */
export function restoreConsent() {
  if (getConsent() === 'granted') loadAnalytics()
}
