import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from 'react'
import { duration, ease, type EaseFn } from '../../lib/motion'

export const clampPos = (v: number) => Math.min(100, Math.max(0, v))

type Options = {
  stageRef: RefObject<HTMLElement | null>
  initial: number
  /** Escribe la posición en el DOM. Se llama dentro de requestAnimationFrame (o directo con teclado). */
  render: (pos: number) => void
  reducedMotion: boolean
  /** Primer gesto del usuario (puntero o teclado). */
  onInteract: () => void
}

/** Distancia horizontal (px) a partir de la cual un toque pasa a ser arrastre. */
const DRAG_THRESHOLD = 4

/**
 * Posición de la línea del visor. Vive en un ref: arrastrar no re-renderiza el componente.
 */
export function useDragPosition({ stageRef, initial, render, reducedMotion, onInteract }: Options) {
  const pos = useRef(clampPos(initial))
  const frame = useRef(0)
  const tween = useRef(0)
  const gesture = useRef<{ id: number; x: number; dragging: boolean } | null>(null)

  const renderRef = useRef(render)
  useLayoutEffect(() => {
    renderRef.current = render
  })

  const schedule = useCallback(() => {
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      renderRef.current(pos.current)
    })
  }, [])

  const stopTween = useCallback(() => {
    if (tween.current) cancelAnimationFrame(tween.current)
    tween.current = 0
  }, [])

  /** Mueve la línea. `immediate` escribe el DOM en el acto (teclado, tests). */
  const set = useCallback(
    (value: number, immediate = false) => {
      stopTween()
      pos.current = clampPos(value)
      if (immediate) renderRef.current(pos.current)
      else schedule()
    },
    [schedule, stopTween],
  )

  /** Recorre una secuencia de posiciones; cada tramo dura en proporción a su distancia. */
  const animateThrough = useCallback(
    (targets: number[], totalMs: number, easing: EaseFn) => {
      stopTween()
      if (reducedMotion) {
        set(targets[targets.length - 1] ?? pos.current)
        return
      }
      const stops = [pos.current, ...targets.map(clampPos)]
      const dist = stops.slice(1).map((p, i) => Math.abs(p - stops[i]))
      const total = dist.reduce((a, b) => a + b, 0)
      if (total === 0) return
      let seg = 0
      let segStart = performance.now()
      const tick = (now: number) => {
        const segMs = (dist[seg] / total) * totalMs
        const t = segMs > 0 ? Math.min(1, (now - segStart) / segMs) : 1
        pos.current = stops[seg] + (stops[seg + 1] - stops[seg]) * easing(t)
        renderRef.current(pos.current)
        if (t >= 1) {
          seg++
          segStart = now
          if (seg >= dist.length) {
            tween.current = 0
            return
          }
        }
        tween.current = requestAnimationFrame(tick)
      }
      tween.current = requestAnimationFrame(tick)
    },
    [reducedMotion, set, stopTween],
  )

  const fromClientX = (clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return pos.current
    return ((clientX - rect.left) / rect.width) * 100
  }

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    onInteract()
    stopTween()
    gesture.current = { id: e.pointerId, x: e.clientX, dragging: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    if (!g.dragging && Math.abs(e.clientX - g.x) > DRAG_THRESHOLD) g.dragging = true
    if (g.dragging) set(fromClientX(e.clientX))
  }

  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    gesture.current = null
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    // Click o toque sin arrastre: la línea viaja hasta ese punto con una transición corta.
    if (!g.dragging) animateThrough([fromClientX(e.clientX)], duration('micro'), ease('lamina'))
  }

  // El navegador tomó el gesto (scroll vertical en móvil): se suelta sin mover nada.
  const onPointerCancel = () => {
    gesture.current = null
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const step = e.shiftKey ? 10 : 2
    let next: number | null = null
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = pos.current - step
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = pos.current + step
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = 100
    if (next === null) return
    e.preventDefault()
    onInteract()
    set(next, true)
  }

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current)
      cancelAnimationFrame(tween.current)
    },
    [],
  )

  return {
    get: () => pos.current,
    set,
    animateThrough,
    stop: stopTween,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
    onKeyDown,
  }
}
