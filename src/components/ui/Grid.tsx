import type { ElementType, ReactNode } from 'react'

type GridProps = {
  as?: ElementType
  className?: string
  children: ReactNode
}

/** Grilla de 12 columnas (4 en móvil) con la misma medianera que el margen. */
export function Grid({ as: Tag = 'div', className = '', children }: GridProps) {
  return (
    <Tag className={`grid grid-cols-4 gap-x-gutter lg:grid-cols-12 ${className}`}>{children}</Tag>
  )
}

/** Líneas de grilla en 1px, alineadas a las columnas de <Grid>. Decorativas. */
export function GridLines({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mx-auto w-full max-w-site px-gutter ${className}`}
    >
      <div className="grid h-full grid-cols-4 gap-x-gutter lg:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`h-full border-l border-(--theme-line) ${i === 3 ? 'border-r lg:border-r-0' : ''} ${i === 11 ? 'border-r' : ''} ${i >= 4 ? 'hidden lg:block' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
