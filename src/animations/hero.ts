import { gsap } from 'gsap'
import { ease, seconds } from '../lib/motion'

/**
 * El monograma se dibuja: primero el trazo horizontal (base, nivel), después las dos
 * diagonales desfasadas y por último el nombre, línea por línea, desde su máscara.
 * Duración total < 2.2 s. El texto y el CTA del hero no esperan a esta animación.
 */
export function heroIntro(root: HTMLElement) {
  const logo = root.querySelector<HTMLElement>('[data-hero-logo]')
  if (!logo) return
  const part = (id: string) => logo.querySelector(`[data-logo-part="${id}"]`)
  const rows = logo.querySelectorAll('[data-logo-row]')
  const draw = { strokeDashoffset: 0 }

  const tl = gsap.timeline({ defaults: { ease: ease('trazo') } })
  tl.fromTo(part('a-base'), { strokeDashoffset: 1 }, { ...draw, duration: seconds('trazo-base') })
    .fromTo(
      part('a-diag-1'),
      { strokeDashoffset: 1 },
      { ...draw, duration: seconds('trazo-diag') },
      '-=0.1',
    )
    .fromTo(
      part('a-diag-2'),
      { strokeDashoffset: 1 },
      { ...draw, duration: seconds('trazo-diag') },
      '<0.2',
    )
    .fromTo(
      rows,
      { y: 26 },
      { y: 0, duration: seconds('reveal') * 0.6, ease: ease('lamina'), stagger: 0.08 },
      '<0.3',
    )

  // Los estados iniciales ya están aplicados: recién ahora se muestra el logo (evita el destello).
  gsap.set(logo, { visibility: 'visible' })
  return tl
}
