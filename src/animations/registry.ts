import { prefersReducedMotion } from '../lib/motion'

// Interruptor por animación. Poner en false desactiva esa animación sin tocar la sección:
// el contenido queda en su estado final, igual que con reduced motion.
export const animationRegistry = {
  hero: true,
  filosofia: true,
  proceso: true,
  proyectos: true,
  servicios: true,
  estudio: true,
  regla: true,
} as const

export type AnimationName = keyof typeof animationRegistry

/** `motion` lo agrega el script inline de index.html solo si hay JS y no hay reduced motion. */
export function canAnimate(name: AnimationName): boolean {
  if (typeof document === 'undefined') return false
  return (
    animationRegistry[name] &&
    !prefersReducedMotion() &&
    document.documentElement.classList.contains('motion')
  )
}
