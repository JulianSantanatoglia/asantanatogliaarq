import { useId, type CSSProperties } from 'react'
import { lockup, monogram, typographic } from './logo-paths'

type LogoProps = {
  variant?: 'lockup' | 'typographic' | 'monogram'
  /** Alto del logo (cualquier longitud CSS). El área de resguardo se calcula a partir de este valor. */
  height?: string
  /** Reserva el área de resguardo del manual (pág. 6) alrededor del logo. */
  clearspace?: boolean
  /** Agrega las capas de máscara para la animación de dibujo (solo lockup). */
  drawable?: boolean
  /** Texto accesible. Si se omite, el logo es decorativo (aria-hidden). */
  title?: string
  className?: string
}

// Máscaras que descubren el monograma sin tocar su geometría.
// Siguen los ejes de la A original: trazo horizontal (base/nivel) y las dos diagonales.
const DRAW_LAYERS = [
  { id: 'a-base', d: 'M-2 122.16H310', width: 16 },
  { id: 'a-diag-1', d: 'M58.35 -4L5.97 134', width: 30 },
  { id: 'a-diag-2', d: 'M39.75 -4L110.8 181', width: 30 },
] as const

// Franjas de cada línea del nombre: el texto sube desde abajo de su franja.
const WORDMARK_ROWS = [
  { id: 'line1', d: lockup.line1, y: 47, h: 23 },
  { id: 'line2', d: lockup.line2, y: 80, h: 23 },
  { id: 'role', d: lockup.role, y: 142, h: 20 },
] as const

export function Logo({
  variant = 'lockup',
  height = '3rem',
  clearspace = false,
  drawable = false,
  title,
  className = '',
}: LogoProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const box = variant === 'lockup' ? lockup : variant === 'typographic' ? typographic : monogram
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  const style = { '--logo-height': height } as CSSProperties

  return (
    <span
      className={`inline-block align-top ${className}`}
      style={{ ...style, padding: clearspace ? 'var(--logo-clearspace)' : undefined }}
      data-logo={variant}
    >
      <svg
        viewBox={`0 0 ${box.width} ${box.height}`}
        style={{ height: 'var(--logo-height)', width: 'auto', overflow: 'visible' }}
        fill="currentColor"
        focusable="false"
        {...a11y}
      >
        {variant === 'lockup' && (
          <>
            {drawable && (
              <defs>
                <mask
                  id={`${uid}-mono`}
                  maskUnits="userSpaceOnUse"
                  x={-10}
                  y={-10}
                  width={box.width + 20}
                  height={box.height + 20}
                >
                  <g fill="none" stroke="white" strokeLinecap="butt">
                    {DRAW_LAYERS.map((l) => (
                      <path
                        key={l.id}
                        id={`${l.id}-${uid}`}
                        data-logo-part={l.id}
                        d={l.d}
                        strokeWidth={l.width}
                        pathLength={1}
                        strokeDasharray="1 1"
                      />
                    ))}
                  </g>
                </mask>
                {WORDMARK_ROWS.map((r) => (
                  <clipPath key={r.id} id={`${uid}-${r.id}`}>
                    <rect x={0} y={r.y} width={box.width} height={r.h} />
                  </clipPath>
                ))}
              </defs>
            )}
            <path
              data-logo-part="monogram"
              d={lockup.monogram}
              mask={drawable ? `url(#${uid}-mono)` : undefined}
            />
            <g data-logo-part="wordmark">
              {WORDMARK_ROWS.map((r) =>
                drawable ? (
                  <g key={r.id} clipPath={`url(#${uid}-${r.id})`}>
                    <path data-logo-part={r.id} data-logo-row="" d={r.d} />
                  </g>
                ) : (
                  <path key={r.id} d={r.d} />
                ),
              )}
            </g>
          </>
        )}
        {variant === 'typographic' && (
          <>
            <path d={typographic.line1} />
            <path d={typographic.line2} />
            <path d={typographic.rule} />
            <path d={typographic.role} />
          </>
        )}
        {variant === 'monogram' && <path d={monogram.d} />}
      </svg>
    </span>
  )
}
