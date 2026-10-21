import { gsap, ScrollTrigger } from '../lib/gsap'
import { ease, prefersReducedMotion, seconds } from '../lib/motion'
import { animationRegistry } from './registry'

/**
 * Header y regla de progreso. Se llama dentro de useGSAP: todo lo que crea se limpia solo.
 * - El header toma el tema de la lámina que tiene debajo.
 * - Se esconde al bajar y aparece al subir (nunca si tiene el foco o el menú abierto).
 * - La regla avanza con el scroll de la página y nombra la lámina actual.
 */
export function headerBehavior(header: HTMLElement) {
  const sheets = Array.from(document.querySelectorAll<HTMLElement>('[data-sheet]'))
  const rulers = Array.from(document.querySelectorAll<HTMLElement>('[data-ruler]'))
  const sideRuler = rulers.find((r) => r.dataset.ruler === 'vertical')
  const label = sideRuler?.querySelector<HTMLElement>('[data-ruler-label]')
  const offset = () => header.offsetHeight / 2

  if (sheets[0]?.dataset.theme) header.dataset.theme = sheets[0].dataset.theme
  if (sideRuler && sheets[0]?.dataset.theme) sideRuler.dataset.theme = sheets[0].dataset.theme

  // Los triggers de lectura se recalculan después de los pin (refreshPriority bajo).
  sheets.forEach((sheet) => {
    const theme = sheet.dataset.theme
    ScrollTrigger.create({
      trigger: sheet,
      start: () => `top top+=${offset()}`,
      end: () => `bottom top+=${offset()}`,
      refreshPriority: -1,
      onToggle: (self) => {
        if (self.isActive && theme) header.dataset.theme = theme
      },
    })
    ScrollTrigger.create({
      trigger: sheet,
      start: 'top center',
      end: 'bottom center',
      refreshPriority: -1,
      onToggle: (self) => {
        if (!self.isActive) return
        if (sideRuler && theme) sideRuler.dataset.theme = theme
        if (label) label.textContent = `L—${sheet.dataset.sheet} · ${sheet.dataset.sheetName ?? ''}`
      },
    })
  })

  if (animationRegistry.regla) {
    const bars = rulers.map((r) => ({
      el: r.querySelector<HTMLElement>('[data-ruler-progress]'),
      axis: r.dataset.ruler === 'vertical' ? 'scaleY' : 'scaleX',
    }))
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      refreshPriority: -1,
      onUpdate: (self) => {
        for (const b of bars) if (b.el) b.el.style.transform = `${b.axis}(${self.progress})`
      },
    })
  }

  let hidden = false
  const setHidden = (value: boolean) => {
    if (value === hidden) return
    hidden = value
    gsap.to(header, {
      yPercent: value ? -100 : 0,
      duration: prefersReducedMotion() ? 0 : seconds('micro'),
      ease: ease('lamina'),
      overwrite: true,
    })
  }
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const keep =
        self.scroll() < header.offsetHeight * 2 ||
        header.matches(':focus-within') ||
        header.dataset.open === 'true'
      setHidden(!keep && self.direction === 1)
    },
  })
  const show = () => setHidden(false)
  header.addEventListener('focusin', show)
  return () => header.removeEventListener('focusin', show)
}
