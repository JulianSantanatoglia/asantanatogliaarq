import { ease } from '../lib/motion'

const HIDDEN = 'inset(0 0 0 100%)'
const SHOWN = 'inset(0 0 0 0%)'

/**
 * Agrega a un timeline el barrido de una <WipeFigure>: la línea entra por la derecha
 * y descubre la imagen hacia la izquierda, como en el visor (el "después" está a la derecha).
 */
export function addWipe(
  tl: gsap.core.Timeline,
  figure: Element,
  position: gsap.Position,
  duration: number,
  easing: gsap.EaseFunction | string = ease('lamina'),
) {
  const line = figure.querySelector('[data-wipe-line]')
  tl.fromTo(figure, { clipPath: HIDDEN }, { clipPath: SHOWN, duration, ease: easing }, position)
  if (line) {
    tl.fromTo(
      line,
      { xPercent: 100, autoAlpha: 1 },
      { xPercent: 0, duration, ease: easing },
      '<',
    ).set(line, { autoAlpha: 0 })
  }
  return tl
}
