import { OBRA_STAGES } from '../content/obra'
import { DESKTOP_MOTION, gsap } from '../lib/gsap'
import { ease, seconds } from '../lib/motion'
import { addWipe } from './wipe'

const MOBILE_MOTION = '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'

// Tiempos del timeline (unidades relativas; el scrub los reparte en el recorrido del pin).
const DESIGN = 2 // el proyecto se traza
const STAGE = 1 // cada etapa de obra
const BUILD_STAGES = OBRA_STAGES.length - 2 // de Fundaciones a Exterior
const BUILD_END = DESIGN + BUILD_STAGES * STAGE
const PHOTO = 1.5 // la línea descubre la casa terminada
const TOTAL = BUILD_END + PHOTO

const FROM: Record<string, gsap.TweenVars> = {
  'draw-x': { scaleX: 0, transformOrigin: '0% 50%' },
  'grow-up': { scaleY: 0, transformOrigin: '50% 100%' },
  'grow-down': { scaleY: 0, transformOrigin: '50% 0%' },
  fade: { opacity: 0 },
}
const TO: Record<string, gsap.TweenVars> = {
  'draw-x': { scaleX: 1 },
  'grow-up': { scaleY: 1 },
  'grow-down': { scaleY: 1 },
  fade: { opacity: 1 },
}

/** Etapa (0–7) para un tiempo del timeline. */
function stageAt(t: number) {
  if (t < DESIGN) return 0
  if (t < BUILD_END) return 1 + Math.floor((t - DESIGN) / STAGE)
  return OBRA_STAGES.length - 1
}

/**
 * Desktop: la sección queda fijada. El corte de la casa se construye con el scroll,
 * etapa por etapa (proyecto → fundaciones → … → exterior), y al final la línea
 * descubre la foto de la casa terminada. Una cota mide el avance.
 * Móvil: sin pin, cada lámina se descubre al entrar.
 */
export function procesoScroll(root: HTMLElement) {
  const mm = gsap.matchMedia()

  mm.add(DESKTOP_MOTION, () => {
    const pin = root.querySelector('[data-proceso-pin]')
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'))
    const drawing = steps[1]?.querySelector<HTMLElement>('[data-obra-fig]')
    const photo = steps[2]?.querySelector('[data-wipe]')
    const stageLabel = drawing?.querySelector('[data-obra-label]')
    const cota = root.querySelector('[data-cota] [data-rule]')
    const cotaLabel = root.querySelector('[data-cota-label]')
    if (!pin || !drawing || !photo) return

    root.classList.add('is-pinned')
    const originalLabel = stageLabel?.textContent ?? ''
    let active = -1
    let stage = -1
    const update = (t: number) => {
      const step = t < DESIGN ? 0 : t < BUILD_END ? 1 : 2
      if (step !== active) {
        active = step
        steps.forEach((s, k) => s.toggleAttribute('data-active', k === step))
        if (cotaLabel) cotaLabel.textContent = `${String(step + 1).padStart(2, '0')} / 03`
      }
      const s = stageAt(t)
      if (s !== stage && stageLabel) {
        stage = s
        stageLabel.textContent = `Etapa ${String(s + 1).padStart(2, '0')} · ${OBRA_STAGES[s]}`
      }
    }
    update(0)

    const tl = gsap.timeline({
      defaults: { ease: ease('trazo') },
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: true,
        onUpdate: (self) => update(self.progress * TOTAL),
      },
    })
    if (cota) tl.fromTo(cota, { scaleX: 0 }, { scaleX: 1, duration: TOTAL, ease: 'none' }, 0)

    for (let s = 0; s < OBRA_STAGES.length - 1; s++) {
      const parts = Array.from(drawing.querySelectorAll<SVGGElement>(`[data-obra="${s}"]`))
      if (!parts.length) continue
      const start = s === 0 ? 0 : DESIGN + (s - 1) * STAGE
      const span = (s === 0 ? DESIGN : STAGE) * 0.85
      const each = span / Math.max(1, parts.length)
      parts.forEach((part, i) => {
        const anim = part.dataset.anim ?? 'fade'
        tl.fromTo(
          part,
          { ...FROM[anim] },
          { ...TO[anim], duration: Math.min(span, each * 2) },
          start + i * each * 0.7,
        )
      })
    }
    // El volumen proyectado (punteado) se va apagando a medida que la obra lo reemplaza.
    const ghost = drawing.querySelector('[data-obra-ghost]')
    if (ghost) tl.to(ghost, { opacity: 0.15, duration: BUILD_END - DESIGN }, DESIGN)

    addWipe(tl, photo, BUILD_END, PHOTO)

    return () => {
      root.classList.remove('is-pinned')
      steps.forEach((s) => s.removeAttribute('data-active'))
      if (stageLabel) stageLabel.textContent = originalLabel
    }
  })

  mm.add(MOBILE_MOTION, () => {
    root.querySelectorAll('[data-step] [data-wipe]').forEach((fig) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%', once: true } })
      addWipe(tl, fig, 0, seconds('reveal'), ease('lamina'))
    })
  })
}
