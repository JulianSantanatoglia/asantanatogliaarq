import { gsap } from '../lib/gsap'

/**
 * Texto que se enciende: cada palabra pasa de apagada a arena a medida que se lee (scrub).
 * Se anima opacidad (no color) para respetar la regla de solo transform / opacity / clip-path.
 */
export function filosofiaReveal(root: HTMLElement) {
  const text = root.querySelector('[data-lit]')
  const words = root.querySelectorAll('[data-word]')
  if (!text || !words.length) return
  gsap.fromTo(
    words,
    { opacity: 0.32 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: text, start: 'top 78%', end: 'bottom 42%', scrub: true },
    },
  )
}
