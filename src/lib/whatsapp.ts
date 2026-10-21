// Arma el mensaje de WhatsApp a partir de la ficha de proyecto. Sin backend: el sitio
// solo construye el link; la persona decide si lo manda desde su WhatsApp.

export type Brief = {
  nombre?: string
  obra?: string
  situacion?: string
  ubicacion?: string
  plazo?: string
}

export type Option = { value: string; label: string; phrase: string }

export const OBRA: Option[] = [
  { value: 'casa-nueva', label: 'Casa nueva', phrase: 'por una casa nueva' },
  { value: 'remodelacion', label: 'Remodelación', phrase: 'por una remodelación' },
  { value: 'ampliacion', label: 'Ampliación', phrase: 'por una ampliación' },
  { value: 'direccion', label: 'Dirección de obra', phrase: 'por la dirección de una obra' },
  { value: 'otra', label: 'Otra consulta', phrase: '' },
]

export const SITUACION: Option[] = [
  { value: 'terreno', label: 'Tengo el terreno', phrase: 'Ya tengo el terreno.' },
  { value: 'casa', label: 'Tengo la casa', phrase: 'Ya tengo la casa.' },
  { value: 'planos', label: 'Tengo planos', phrase: 'Ya tengo planos.' },
  { value: 'empezando', label: 'Recién empiezo', phrase: 'Estoy empezando a pensarlo.' },
]

export const PLAZO: Option[] = [
  { value: 'pronto', label: 'Lo antes posible', phrase: 'Me gustaría empezar lo antes posible.' },
  {
    value: 'meses',
    label: 'En los próximos meses',
    phrase: 'Me gustaría empezar en los próximos meses.',
  },
  {
    value: 'evaluando',
    label: 'Estoy evaluando',
    phrase: 'Todavía estoy evaluando opciones, sin apuro.',
  },
]

export const LIMITS = { nombre: 40, ubicacion: 60 } as const

const find = (list: Option[], value?: string) => list.find((o) => o.value === value)

/** Normaliza texto libre: sin espacios de más, sin saltos y con largo máximo. */
export function clean(text: string | undefined, max: number): string {
  return (text ?? '').replace(/\s+/g, ' ').trim().slice(0, max).trim()
}

export function composeMessage(brief: Brief, recipient = 'Alejandro'): string {
  const nombre = clean(brief.nombre, LIMITS.nombre)
  const ubicacion = clean(brief.ubicacion, LIMITS.ubicacion)
  const obra = find(OBRA, brief.obra)

  const parts = [nombre ? `Hola ${recipient}, soy ${nombre}.` : `Hola ${recipient}.`]
  let consulta = 'Quiero hacer una consulta'
  if (obra?.phrase) consulta += ` ${obra.phrase}`
  if (ubicacion) consulta += ` en ${ubicacion}`
  parts.push(`${consulta}.`)

  const situacion = find(SITUACION, brief.situacion)
  if (situacion) parts.push(situacion.phrase)
  const plazo = find(PLAZO, brief.plazo)
  if (plazo) parts.push(plazo.phrase)
  return parts.join(' ')
}

export function whatsappHref(base: string, message: string): string {
  return `${base}?text=${encodeURIComponent(message)}`
}

export const labelOf = (list: Option[], value?: string) => find(list, value)?.label
