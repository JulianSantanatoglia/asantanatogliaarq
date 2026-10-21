import { useId, useState } from 'react'
import { site } from '../content/site'
import { track } from '../lib/analytics'
import {
  composeMessage,
  labelOf,
  LIMITS,
  OBRA,
  PLAZO,
  SITUACION,
  whatsappHref,
  type Brief,
  type Option,
} from '../lib/whatsapp'
import { Label } from './ui/Label'
import { Rule } from './ui/Rule'

/**
 * Ficha de proyecto → mensaje de WhatsApp. La persona completa la ficha, ve el mensaje
 * armado y lo abre en WhatsApp. El sitio no guarda ni envía datos.
 */
export function WhatsAppBrief() {
  const uid = useId()
  const [brief, setBrief] = useState<Brief>({})
  const set = (k: keyof Brief) => (v: string) => setBrief((b) => ({ ...b, [k]: v }))
  const message = composeMessage(brief)
  const href = whatsappHref(site.whatsapp, message)
  const pending = 'Por definir'

  const summary = [
    { k: 'Obra', v: labelOf(OBRA, brief.obra) ?? pending },
    { k: 'Ubicación', v: brief.ubicacion?.trim() || pending },
    { k: 'Plazo', v: labelOf(PLAZO, brief.plazo) ?? pending },
  ]

  return (
    <div className="ficha theme-arena grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(18rem,0.7fr)]">
      {/* Ficha */}
      <div className="flex flex-col">
        <div className="ficha__bar">
          <Label>Ficha de proyecto</Label>
        </div>
        <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
          <TextField
            id={`${uid}-nombre`}
            label="Propietario · Nombre"
            placeholder="Ej.: Carla"
            maxLength={LIMITS.nombre}
            autoComplete="given-name"
            value={brief.nombre ?? ''}
            onChange={set('nombre')}
          />
          <ChipGroup
            name={`${uid}-obra`}
            legend="Obra · ¿Qué querés hacer?"
            options={OBRA}
            value={brief.obra}
            onChange={set('obra')}
          />
          <ChipGroup
            name={`${uid}-situacion`}
            legend="Situación · ¿En qué punto estás?"
            options={SITUACION}
            value={brief.situacion}
            onChange={set('situacion')}
          />
          <TextField
            id={`${uid}-ubicacion`}
            label="Ubicación · ¿Dónde es la obra?"
            placeholder="Ej.: Cariló"
            maxLength={LIMITS.ubicacion}
            autoComplete="address-level2"
            value={brief.ubicacion ?? ''}
            onChange={set('ubicacion')}
          />
          <ChipGroup
            name={`${uid}-plazo`}
            legend="Plazo · ¿Cuándo querés empezar?"
            options={PLAZO}
            value={brief.plazo}
            onChange={set('plazo')}
          />
        </div>
      </div>

      <CutLine />

      {/* Mensaje */}
      <div className="flex flex-col">
        <div className="ficha__bar">
          <Label>Mensaje listo para enviar</Label>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-6 md:p-8 lg:p-10">
          <dl className="grid grid-cols-3 gap-4">
            {summary.map((s) => (
              <div key={s.k} className="flex min-w-0 flex-col gap-1.5">
                <dt>
                  <Label muted>{s.k}</Label>
                </dt>
                <dd className="truncate text-small font-medium">{s.v}</dd>
              </div>
            ))}
          </dl>
          <Rule />
          <p
            id={`${uid}-mensaje`}
            aria-live="polite"
            className="text-lead font-medium tracking-tight"
          >
            {message}
          </p>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className="btn btn--solid w-full"
              aria-describedby={`${uid}-nota`}
              onClick={() =>
                track('click_whatsapp', { location: 'ficha', obra: brief.obra ?? 'sin_obra' })
              }
            >
              <span>Enviar por WhatsApp</span>
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <p id={`${uid}-nota`} className="text-small text-(--theme-muted)">
              Se abre WhatsApp con el mensaje ya escrito. Vos decidís si lo mandás.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

type TextFieldProps = {
  id: string
  label: string
  placeholder: string
  maxLength: number
  autoComplete: string
  value: string
  onChange: (v: string) => void
}

function TextField({ id, label, onChange, ...input }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">
        {label}{' '}
        <span className="text-small font-normal tracking-normal text-(--theme-muted) normal-case">
          (opcional)
        </span>
      </label>
      <input
        id={id}
        type="text"
        className="ficha__input"
        onChange={(e) => onChange(e.target.value)}
        {...input}
      />
    </div>
  )
}

type ChipGroupProps = {
  name: string
  legend: string
  options: Option[]
  value?: string
  onChange: (v: string) => void
}

/** Grupo de opciones con radios nativos: flechas del teclado, foco y lector de pantalla gratis. */
function ChipGroup({ name, legend, options, value, onChange }: ChipGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="label mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="chip">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Línea de corte A–A' de plano: separa la ficha del mensaje. */
function CutLine() {
  return (
    <div aria-hidden="true" className="ficha__cut">
      <span className="ficha__cut-mark">A</span>
      {/* Trazo y punto, como la línea de corte de un plano */}
      <svg
        className="ficha__cut-line ficha__cut-line--h"
        preserveAspectRatio="none"
        viewBox="0 0 100 1"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="currentColor"
          strokeDasharray="18 6 3 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        className="ficha__cut-line ficha__cut-line--v"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="currentColor"
          strokeDasharray="18 6 3 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="ficha__cut-mark">A'</span>
    </div>
  )
}
