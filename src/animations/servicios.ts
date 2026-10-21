import { gsap } from '../lib/gsap'
import { ease, seconds } from '../lib/motion'

/** Las líneas de 1px de la lista se dibujan de izquierda a derecha al entrar en pantalla. */
export function serviciosLines(root: HTMLElement) {
  const list = root.querySelector('[data-services]')
  const rules = root.querySelectorAll('[data-services] [data-rule]')
  if (!list || !rules.length) return
  gsap.fromTo(
    rules,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: seconds('reveal'),
      ease: ease('trazo'),
      stagger: 0.15,
      scrollTrigger: { trigger: list, start: 'top 80%', once: true },
    },
  )
}
