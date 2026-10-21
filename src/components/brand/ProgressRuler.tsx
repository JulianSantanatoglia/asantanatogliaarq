type ProgressRulerProps = {
  orientation: 'horizontal' | 'vertical'
  className?: string
}

// Marcas cada 5 y números cada 20: suficiente para leerla como regla sin hacer ruido.
const TICKS = Array.from({ length: 21 }, (_, i) => i * 5)

/**
 * Regla de progreso, como la regla metálica de la papelería del manual (pág. 11).
 * Marcas cada 5 y números cada 20. Decorativa: no reemplaza a la navegación.
 * El avance y la lámina actual los escribe animations/header.ts.
 */
export function ProgressRuler({ orientation, className = '' }: ProgressRulerProps) {
  const pos = orientation === 'vertical' ? 'top' : 'left'
  return (
    <div
      aria-hidden="true"
      data-ruler={orientation}
      className={`ruler ruler--${orientation} pointer-events-none select-none ${className}`}
    >
      <div className="ruler__scale">
        {TICKS.map((n) => (
          <span
            key={n}
            className={`ruler__tick ${n % 20 === 0 ? 'is-major' : n % 10 === 0 ? 'is-half' : ''}`}
            style={{ [pos]: `${n}%` }}
          >
            {n % 20 === 0 && <span className="ruler__num">{n}</span>}
          </span>
        ))}
        <span data-ruler-progress="" className="ruler__progress" />
      </div>
      {orientation === 'vertical' && <span data-ruler-label="" className="ruler__label label" />}
    </div>
  )
}
