// Eventos de GA4. [PENDIENTE paso 6] Consent Mode v2: no se carga nada hasta aceptar cookies.
export type AnalyticsEvent =
  | 'click_whatsapp'
  | 'click_phone'
  | 'click_email'
  | 'form_submit'
  | 'before_after_interact'
  | 'project_open'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
}

/** Igual que track, pero una sola vez por sesión para cada `key` (ej.: un evento por visor). */
export function trackOncePerSession(
  event: AnalyticsEvent,
  key: string,
  params: Record<string, string | number> = {},
) {
  const id = `ev:${event}:${key}`
  try {
    if (sessionStorage.getItem(id)) return
    sessionStorage.setItem(id, '1')
  } catch {
    // Sin sessionStorage (modo privado estricto): se manda igual.
  }
  track(event, params)
}
