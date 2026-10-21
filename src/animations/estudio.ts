import { gsap } from '../lib/gsap'
import { ease, seconds } from '../lib/motion'
import { addWipe } from './wipe'

/** La foto se descubre con la misma línea que el proceso y el visor, una sola vez. */
export function estudioReveal(root: HTMLElement) {
  const fig = root.querySelector('[data-wipe]')
  if (!fig) return
  const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 80%', once: true } })
  addWipe(tl, fig, 0, seconds('reveal') * 1.2, ease('lamina'))
}
