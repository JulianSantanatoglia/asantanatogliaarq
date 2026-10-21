import type { ReactNode, Ref } from 'react'

export type Theme = 'arena' | 'grafito' | 'negro' | 'topo' | 'blanco'

type SheetProps = {
  id: string
  sheet: { index: string; name: string }
  theme: Theme
  labelledBy?: string
  className?: string
  ref?: Ref<HTMLElement>
  children: ReactNode
}

/**
 * Una lámina de la página. `data-sheet` y `data-theme` los leen el header y la regla
 * de progreso para saber en qué lámina está el usuario y sobre qué color se apoyan.
 */
export function Sheet({ id, sheet, theme, labelledBy, className = '', ref, children }: SheetProps) {
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-sheet={sheet.index}
      data-sheet-name={sheet.name}
      data-theme={theme}
      className={`relative ${className}`}
    >
      {children}
    </section>
  )
}
