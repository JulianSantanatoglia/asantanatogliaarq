// Lee los tokens de movimiento de src/styles/index.css para que JS y CSS
// usen exactamente las mismas curvas y duraciones.

export type EaseToken = 'trazo' | 'lamina'
export type DurationToken = 'micro' | 'reveal' | 'trazo-base' | 'trazo-diag' | 'sweep'
export type EaseFn = (t: number) => number

const FALLBACK_EASE: Record<EaseToken, [number, number, number, number]> = {
  trazo: [0.33, 0, 0.2, 1],
  lamina: [0.65, 0, 0.35, 1],
}
const FALLBACK_DURATION: Record<DurationToken, number> = {
  micro: 300,
  reveal: 1000,
  'trazo-base': 600,
  'trazo-diag': 800,
  sweep: 1600,
}

function readVar(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/** Duración en milisegundos. */
export function duration(token: DurationToken): number {
  const raw = readVar(`--duration-${token}`)
  const ms = raw.endsWith('ms') ? parseFloat(raw) : raw.endsWith('s') ? parseFloat(raw) * 1000 : NaN
  return Number.isFinite(ms) ? ms : FALLBACK_DURATION[token]
}

/** Duración en segundos, para GSAP. */
export const seconds = (token: DurationToken) => duration(token) / 1000

const cache = new Map<string, EaseFn>()

export function ease(token: EaseToken): EaseFn {
  const raw = readVar(`--ease-${token}`)
  const key = `${token}:${raw}`
  const hit = cache.get(key)
  if (hit) return hit
  const match = raw.match(/cubic-bezier\(([^)]+)\)/)
  const parsed = match?.[1].split(',').map((n) => parseFloat(n))
  const points =
    parsed && parsed.length === 4 && parsed.every(Number.isFinite)
      ? (parsed as [number, number, number, number])
      : FALLBACK_EASE[token]
  const fn = cubicBezier(...points)
  cache.set(key, fn)
  return fn
}

/** Solver de cubic-bezier (mismo método que los navegadores: Newton + bisección). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): EaseFn {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx

  const solveX = (x: number) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x
      if (Math.abs(err) < 1e-6) return t
      const d = slopeX(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    let lo = 0
    let hi = 1
    t = x
    while (lo < hi) {
      const v = sampleX(t)
      if (Math.abs(v - x) < 1e-6) return t
      if (x > v) lo = t
      else hi = t
      t = (lo + hi) / 2
      if (hi - lo < 1e-7) break
    }
    return t
  }

  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveX(x)))
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
