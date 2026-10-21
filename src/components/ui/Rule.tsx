import type { ReactNode } from 'react'

type RuleProps = {
  className?: string
  /** Punto de origen cuando se anima el dibujo (scaleX). */
  origin?: 'left' | 'right'
}

/** Línea de 1px en el color de línea de la lámina. Decorativa. */
export function Rule({ className = '', origin = 'left' }: RuleProps) {
  return (
    <span
      aria-hidden="true"
      data-rule=""
      className={`block h-px w-full bg-(--theme-line) ${origin === 'left' ? 'origin-left' : 'origin-right'} ${className}`}
    />
  )
}

type DimensionProps = {
  /** Texto de la cota (medida, etiqueta). Si es información real, pasá decorative={false}. */
  children?: ReactNode
  decorative?: boolean
  className?: string
}

/**
 * Cota de plano: línea de medida con líneas de extensión y remates a 45°.
 * Se dibuja de izquierda a derecha si se anima su [data-rule].
 */
export function Dimension({ children, decorative = true, className = '' }: DimensionProps) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={`relative flex flex-col items-center gap-2 text-(--theme-line) ${className}`}
    >
      {children !== undefined && (
        <span className="label text-(--theme-muted) tabular-nums">{children}</span>
      )}
      <span className="relative block h-4 w-full">
        <span data-rule="" className="absolute inset-x-0 top-1/2 h-px origin-left bg-current" />
        <span className="absolute top-0 left-0 h-full w-px bg-current" />
        <span className="absolute top-0 right-0 h-full w-px bg-current" />
        <span className="absolute top-1/2 left-0 h-3 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
        <span className="absolute top-1/2 right-0 h-3 w-px translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
      </span>
    </div>
  )
}
