import { useCallback, useEffect, useRef, type CSSProperties } from 'react'
import type { ImageAsset } from '../../content/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { duration, ease } from '../../lib/motion'
import { Picture } from '../ui/Picture'
import { clampPos, useDragPosition } from './useDragPosition'
import './BeforeAfter.css'

export type BeforeAfterProps = {
  before: ImageAsset
  after: ImageAsset
  /** Ambiente que se compara: "Living", "Fachada"… */
  label: string
  initial?: number
  labels?: { before: string; after: string }
  /** Barrido inicial que enseña el gesto (una sola vez). */
  intro?: boolean
  /** Línea en arena (default) o en blanco para fotos claras. */
  tone?: 'arena' | 'blanco'
  /** Imágenes sobre la línea de flotación: carga inmediata y prioridad alta. */
  priority?: boolean
  /** Primer gesto del usuario sobre este visor. */
  onInteract?: () => void
  className?: string
}

/** Margen (px) con el que una etiqueta se desvanece antes de que la línea la toque. */
const TAG_MARGIN = 12

export function BeforeAfter({
  before,
  after,
  label,
  initial = 50,
  labels = { before: 'Antes', after: 'Después' },
  intro = true,
  tone = 'arena',
  priority = false,
  onInteract,
  className = '',
}: BeforeAfterProps) {
  const start = clampPos(initial)
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const beforeTagRef = useRef<HTMLSpanElement>(null)
  const afterTagRef = useRef<HTMLSpanElement>(null)
  const edges = useRef({ before: 0, after: 100 })
  const interacted = useRef(false)
  const lastPos = useRef(start)

  const valueText = (v: number) =>
    `${v}% ${labels.before.toLowerCase()}, ${100 - v}% ${labels.after.toLowerCase()}`

  // Única escritura al DOM: custom property, aria y etiquetas. Sin setState.
  const render = (p: number) => {
    lastPos.current = p
    stageRef.current?.style.setProperty('--pos', `${p}%`)
    const handle = handleRef.current
    if (handle) {
      const v = Math.round(p)
      handle.setAttribute('aria-valuenow', String(v))
      handle.setAttribute('aria-valuetext', valueText(v))
    }
    beforeTagRef.current?.toggleAttribute('data-covered', p < edges.current.before)
    afterTagRef.current?.toggleAttribute('data-covered', p > edges.current.after)
  }

  const notifyInteract = useCallback(() => {
    if (interacted.current) return
    interacted.current = true
    onInteract?.()
  }, [onInteract])

  const drag = useDragPosition({
    stageRef,
    initial: start,
    render,
    reducedMotion,
    onInteract: notifyInteract,
  })

  // Dónde terminan las etiquetas, en % del ancho, para saber cuándo las tapa la línea.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const measure = () => {
      const w = stage.offsetWidth
      const b = beforeTagRef.current
      const a = afterTagRef.current
      if (!w || !b || !a) return
      edges.current = {
        before: ((b.offsetLeft + b.offsetWidth + TAG_MARGIN) / w) * 100,
        after: ((a.offsetLeft - TAG_MARGIN) / w) * 100,
      }
      render(lastPos.current)
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    return () => ro.disconnect()
    // render solo escribe en refs y DOM; no necesita ser dependencia
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Las dos imágenes del par se muestran juntas; el barrido inicial espera a que estén y a que el visor se vea.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('.ba__pane img'))
    let visible = false
    let played = false
    const loaded = () => imgs.every((img) => img.complete && img.naturalWidth > 0)

    const tryIntro = () => {
      if (played || !visible || !loaded()) return
      played = true
      if (!intro || reducedMotion || interacted.current) return
      drag.animateThrough([start - 20, start + 20, start], duration('sweep'), ease('lamina'))
    }
    const onLoad = () => {
      if (loaded()) root.setAttribute('data-loaded', '')
      tryIntro()
    }
    imgs.forEach((img) => img.addEventListener('load', onLoad))
    onLoad()

    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            visible = true
            tryIntro()
            if (played) io?.disconnect()
          }
        },
        { threshold: 0.5 },
      )
      io.observe(root)
    }
    return () => {
      imgs.forEach((img) => img.removeEventListener('load', onLoad))
      io?.disconnect()
      drag.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, reducedMotion, start])

  const img = (asset: ImageAsset) => (
    <Picture
      image={asset}
      sizes={asset.sizes ?? '(min-width: 1440px) 1360px, 100vw'}
      priority={priority}
      draggable={false}
    />
  )

  const v = Math.round(start)

  return (
    <figure ref={rootRef} className={`ba ${className}`} data-tone={tone}>
      <div
        ref={stageRef}
        className="ba__stage"
        style={
          {
            '--pos': `${start}%`,
            '--ratio': `${after.width} / ${after.height}`,
            '--ratio-n': after.width / after.height,
          } as CSSProperties
        }
        {...drag.handlers}
      >
        <div className="ba__pane ba__pane--before">
          {img(before)}
          <span ref={beforeTagRef} className="ba__tag label" data-side="before">
            {labels.before}
          </span>
        </div>
        <div className="ba__pane ba__pane--after">
          {img(after)}
          <span ref={afterTagRef} className="ba__tag label" data-side="after">
            {labels.after}
          </span>
        </div>
        <div className="ba__divider">
          <span className="ba__line" aria-hidden="true" />
          <div
            ref={handleRef}
            className="ba__handle"
            role="slider"
            tabIndex={0}
            aria-label={`Comparar antes y después: ${label}`}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={v}
            aria-valuetext={valueText(v)}
            onKeyDown={drag.onKeyDown}
          >
            <svg viewBox="0 0 22 10" aria-hidden="true" focusable="false">
              <path
                d="M5 1L1 5L5 9M17 1L21 5L17 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </figure>
  )
}
