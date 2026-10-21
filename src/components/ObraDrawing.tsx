import { useId, type ReactNode } from 'react'
import { OBRA_STAGES } from '../content/obra'

/**
 * Corte esquemático de una casa, dibujado a escala (80 px = 1 m) y separado por etapas de obra.
 * Es una ilustración del método, no un proyecto real.
 *
 * Cada elemento declara su etapa (data-obra) y cómo se construye (data-anim):
 *  - draw-x: se dibuja de izquierda a derecha   - grow-up: crece desde la base
 *  - grow-down: crece hacia abajo (fundaciones) - fade: aparece
 * animations/proceso.ts los recorre en ese orden con el scroll. Sin animación se ve completo.
 */

type Anim = 'draw-x' | 'grow-up' | 'grow-down' | 'fade'

const GROUND = 700
const L1 = 460 // +3,00
const L2 = 220 // +6,00
const AXES = [
  { id: 'A', x: 320 },
  { id: 'B', x: 640 },
  { id: 'C', x: 960 },
  { id: 'D', x: 1280 },
]

type PartProps = { stage: number; anim: Anim; upTo: number; children: ReactNode }

/** Un elemento de obra: su etapa y cómo se construye. Fuera de `upTo` no se dibuja. */
function Part({ stage, anim, upTo, children }: PartProps) {
  if (stage > upTo) return null
  return (
    <g data-obra={stage} data-anim={anim}>
      {children}
    </g>
  )
}

type ObraDrawingProps = {
  /** Muestra solo hasta esta etapa (0 = proyecto). Por defecto, todas. */
  upTo?: number
  /** Rótulo de la lámina. El animado lo reescribe por etapa. */
  label: string
  className?: string
}

export function ObraDrawing({
  upTo = OBRA_STAGES.length,
  label,
  className = '',
}: ObraDrawingProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const hatch = `${uid}-hatch`
  return (
    <figure
      data-obra-fig=""
      data-wipe=""
      className={`relative m-0 overflow-hidden border border-(--theme-line) bg-blanco text-negro ${className}`}
    >
      <svg
        viewBox="0 0 1600 1000"
        className="block h-full w-full"
        role="img"
        aria-label="Corte esquemático de una casa dibujado por etapas de obra: proyecto, fundaciones, estructura, muros, aberturas, cubierta y exterior."
        fill="none"
        strokeLinecap="square"
      >
        <defs>
          {/* Rayado de muro cortado, a 45° */}
          <pattern
            id={hatch}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="9" stroke="var(--color-grafito)" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* ── 0 · Proyecto: terreno, ejes, niveles, cotas y volumen proyectado ── */}
        <Part upTo={upTo} stage={0} anim="draw-x">
          <line x1="0" y1={GROUND} x2="1600" y2={GROUND} stroke="currentColor" strokeWidth="2" />
        </Part>
        <Part upTo={upTo} stage={0} anim="fade">
          <path
            d={Array.from({ length: 67 }, (_, i) => `M${i * 24 + 6} ${GROUND + 2}l-12 16`).join('')}
            stroke="var(--color-gris)"
          />
        </Part>
        {AXES.map((a) => (
          <Part upTo={upTo} key={a.id} stage={0} anim="grow-down">
            <line
              x1={a.x}
              y1="150"
              x2={a.x}
              y2="840"
              stroke="var(--color-gris)"
              strokeDasharray="28 8 4 8"
            />
          </Part>
        ))}
        {AXES.map((a) => (
          <Part upTo={upTo} key={`b${a.id}`} stage={0} anim="fade">
            <circle cx={a.x} cy="118" r="22" stroke="var(--color-gris)" />
            <text
              x={a.x}
              y="126"
              textAnchor="middle"
              fill="var(--color-grafito)"
              fontSize="22"
              fontWeight="500"
            >
              {a.id}
            </text>
          </Part>
        ))}
        {[
          { y: GROUND, t: '±0,00' },
          { y: L1, t: '+3,00' },
          { y: L2, t: '+6,00' },
        ].map((l) => (
          <Part upTo={upTo} key={l.t} stage={0} anim="draw-x">
            <path d={`M150 ${l.y}l12 -16h-24z`} fill="var(--color-grafito)" />
            <text x="176" y={l.y - 4} fill="var(--color-grafito)" fontSize="20">
              {l.t}
            </text>
            {l.y !== GROUND && (
              <line
                x1="250"
                y1={l.y}
                x2="1420"
                y2={l.y}
                stroke="var(--color-gris)"
                strokeDasharray="4 10"
              />
            )}
          </Part>
        ))}
        <Part upTo={upTo} stage={0} anim="draw-x">
          <g stroke="var(--color-gris)">
            <line x1="320" y1="880" x2="1280" y2="880" />
            {AXES.map((a) => (
              <g key={a.id}>
                <line x1={a.x} y1="856" x2={a.x} y2="896" />
                <line x1={a.x - 8} y1="888" x2={a.x + 8} y2="872" strokeWidth="2" />
              </g>
            ))}
          </g>
          {[480, 800, 1120].map((x) => (
            <text
              key={x}
              x={x}
              y="866"
              textAnchor="middle"
              fill="var(--color-grafito)"
              fontSize="20"
            >
              4,00
            </text>
          ))}
          <text
            x="800"
            y="935"
            textAnchor="middle"
            fill="var(--color-grafito)"
            fontSize="22"
            fontWeight="500"
          >
            12,00 m
          </text>
        </Part>
        <Part upTo={upTo} stage={0} anim="fade">
          <path
            data-obra-ghost=""
            d={`M320 ${GROUND}V${L1}H560V${L2}H1360V${L1}H1280V${GROUND}`}
            stroke="var(--color-grafito)"
            strokeDasharray="10 8"
          />
        </Part>

        {/* ── 1 · Fundaciones ── */}
        {AXES.map((a) => (
          <Part upTo={upTo} key={`f${a.id}`} stage={1} anim="grow-down">
            <rect x={a.x - 14} y={GROUND} width="28" height="36" fill="var(--color-grafito)" />
            <rect
              x={a.x - 52}
              y={GROUND + 36}
              width="104"
              height="26"
              fill="var(--color-grafito)"
            />
          </Part>
        ))}

        {/* ── 2 · Estructura: columnas que crecen, losas que se tienden ── */}
        {AXES.map((a) => (
          <Part upTo={upTo} key={`c0${a.id}`} stage={2} anim="grow-up">
            <rect
              x={a.x - 8}
              y={L1 + 20}
              width="16"
              height={GROUND - L1 - 20}
              fill="var(--color-grafito)"
            />
          </Part>
        ))}
        <Part upTo={upTo} stage={2} anim="draw-x">
          <rect x="300" y={L1} width="1080" height="20" fill="var(--color-grafito)" />
        </Part>
        {AXES.slice(1).map((a) => (
          <Part upTo={upTo} key={`c1${a.id}`} stage={2} anim="grow-up">
            <rect
              x={a.x - 8}
              y={L2 + 20}
              width="16"
              height={L1 - L2 - 20}
              fill="var(--color-grafito)"
            />
          </Part>
        ))}
        <Part upTo={upTo} stage={2} anim="draw-x">
          <rect x="540" y={L2} width="840" height="20" fill="var(--color-grafito)" />
        </Part>

        {/* ── 3 · Muros cortados, con rayado ── */}
        {[
          { x: 300, y: L1 + 20, h: GROUND - L1 - 20 },
          { x: 540, y: L2 + 20, h: L1 - L2 - 20 },
          { x: 1356, y: L2 + 20, h: L1 - L2 - 20 },
          { x: 540, y: L2 - 28, h: 28 },
          { x: 1356, y: L2 - 28, h: 28 },
        ].map((w) => (
          <Part upTo={upTo} key={`${w.x}-${w.y}`} stage={3} anim="grow-up">
            <rect
              x={w.x}
              y={w.y}
              width="24"
              height={w.h}
              fill={`url(#${hatch})`}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </Part>
        ))}

        {/* ── 4 · Aberturas: carpinterías en línea fina ── */}
        <Part upTo={upTo} stage={4} anim="grow-up">
          <g stroke="currentColor" strokeWidth="1.5">
            <rect x="656" y="488" width="608" height="212" />
            {[808, 960, 1112].map((x) => (
              <line key={x} x1={x} y1="488" x2={x} y2="700" />
            ))}
            <line x1="656" y1="496" x2="1264" y2="496" stroke="var(--color-gris)" />
          </g>
        </Part>
        <Part upTo={upTo} stage={4} anim="grow-up">
          <g stroke="currentColor" strokeWidth="1.5">
            <rect x="380" y="530" width="200" height="110" />
            <line x1="480" y1="530" x2="480" y2="640" />
          </g>
        </Part>
        <Part upTo={upTo} stage={4} anim="grow-up">
          <g stroke="currentColor" strokeWidth="1.5">
            <rect x="600" y="262" width="736" height="150" />
            {[784, 968, 1152].map((x) => (
              <line key={x} x1={x} y1="262" x2={x} y2="412" />
            ))}
          </g>
        </Part>

        {/* ── 5 · Cubierta ── */}
        <Part upTo={upTo} stage={5} anim="draw-x">
          <rect x="540" y={L2 - 34} width="840" height="6" fill="currentColor" />
          <line
            x1="520"
            y1={L2 - 34}
            x2="1400"
            y2={L2 - 34}
            stroke="currentColor"
            strokeWidth="2"
          />
        </Part>

        {/* ── 6 · Exterior: pileta y pinos ── */}
        <Part upTo={upTo} stage={6} anim="grow-down">
          <path
            d={`M1420 ${GROUND}V${GROUND + 70}H1570V${GROUND}`}
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="1426"
            y1={GROUND + 12}
            x2="1564"
            y2={GROUND + 12}
            stroke="var(--color-gris)"
            strokeDasharray="12 8"
          />
        </Part>
        {[
          { x: 110, r: 70, top: 470 },
          { x: 210, r: 52, top: 540 },
        ].map((t) => (
          <Part upTo={upTo} key={t.x} stage={6} anim="grow-up">
            <line
              x1={t.x}
              y1={GROUND}
              x2={t.x}
              y2={t.top + t.r}
              stroke="var(--color-grafito)"
              strokeWidth="2"
            />
            <ellipse
              cx={t.x}
              cy={t.top + t.r * 0.6}
              rx={t.r}
              ry={t.r * 0.6}
              stroke="var(--color-grafito)"
            />
          </Part>
        ))}
      </svg>
      <span
        data-obra-label=""
        className="label absolute top-4 left-4 bg-blanco px-2 py-1 text-negro"
      >
        {label}
      </span>
      <span data-wipe-line="" aria-hidden="true" className="wipe-line">
        <span />
      </span>
    </figure>
  )
}
