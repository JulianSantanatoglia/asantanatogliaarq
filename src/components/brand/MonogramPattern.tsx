import { useId } from 'react'
import { monogram, pattern } from './logo-paths'

type MonogramPatternProps = {
  /** Alto de cada A en px. */
  moduleHeight?: number
  /** Opacidad de la trama (token). Grafito: 0.07, topo: 0.05. */
  opacity?: 'default' | 'topo'
  className?: string
}

/** Trama de monogramas "A" tono sobre tono, como en la portada del manual. Estática. */
export function MonogramPattern({
  moduleHeight = 240,
  opacity = 'default',
  className = '',
}: MonogramPatternProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const s = moduleHeight / monogram.height
  const { width: w, height: h, offsetX: ox, offsetY: oy } = pattern
  // Módulo en la esquina y en el centro de la celda; las copias desplazadas cubren lo que asoma de las vecinas.
  const copies: [number, number][] = [
    [0, 0],
    [ox, oy],
    [ox - w, oy],
    [ox, oy - h],
    [ox - w, oy - h],
  ]

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full text-blanco ${className}`}
      style={{
        opacity: opacity === 'topo' ? 'var(--pattern-opacity-topo)' : 'var(--pattern-opacity)',
      }}
    >
      <defs>
        <pattern
          id={`${uid}-trama`}
          width={w}
          height={h}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${s})`}
        >
          {copies.map(([x, y]) => (
            <path key={`${x}:${y}`} d={monogram.d} transform={`translate(${x} ${y})`} fill="currentColor" />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${uid}-trama)`} />
    </svg>
  )
}
