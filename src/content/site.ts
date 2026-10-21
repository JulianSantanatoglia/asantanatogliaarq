// Todos los textos y datos de contacto de la web. Editar acá, no en los componentes.
// Datos de contacto tomados de la tarjeta del manual (pág. 12), confirmados por el cliente.
import { tempImage } from './projects'

export const site = {
  name: 'Alejandro E. Santanatoglia',
  role: 'Arquitecto',
  matricula: '21943',
  colegio: '[PENDIENTE: colegio profesional]',
  zone: '[PENDIENTE: zona de trabajo]',
  phone: { display: '223 504-5893', intl: '+54 223 504-5893', href: 'tel:+542235045893' },
  whatsapp: 'https://wa.me/5492235045893',
  email: 'arq.alejandro.e@gmail.com',
  instagram: { handle: '@arq.alejandroe', href: 'https://www.instagram.com/arq.alejandroe/' },
  domain: 'alejandroe.com',
  url: 'https://alejandroe.com',
} as const

export const seo = {
  // [PENDIENTE] Sumar la zona al título cuando se confirme ("… remodelaciones en [ZONA]").
  title: 'Alejandro E. Santanatoglia · Arquitecto | Proyecto, obra y remodelaciones',
  description:
    'Alejandro E. Santanatoglia, arquitecto. Proyecto de arquitectura, dirección de obra y remodelaciones integrales. Del primer trazo a la casa habitada.',
  ogImage: {
    src: '/og.png',
    width: 1200,
    height: 630,
    alt: 'Alejandro E. Santanatoglia · Arquitecto',
  },
} as const

/** Láminas de la página, en orden. El índice alimenta los rótulos y la regla de progreso. */
export const sheets = {
  inicio: { index: '01', name: 'Inicio' },
  filosofia: { index: '02', name: 'Filosofía' },
  proceso: { index: '03', name: 'Proceso' },
  proyectos: { index: '04', name: 'Proyectos' },
  servicios: { index: '05', name: 'Servicios' },
  estudio: { index: '06', name: 'Estudio' },
  contacto: { index: '07', name: 'Contacto' },
  rotulo: { index: '08', name: 'Rótulo' },
} as const

export const sheetCount = Object.keys(sheets).length

export const nav = [
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#estudio', label: 'Estudio' },
] as const

export const hero = {
  triad: [
    { word: 'Diseñar', strong: false },
    { word: 'Construir', strong: true },
    { word: 'Habitar', strong: false },
  ],
  proposal:
    'Proyecto, dirección de obra y remodelaciones integrales. Del primer trazo a la casa habitada.',
  cta: { label: 'Ver proyectos', href: '#proyectos' },
} as const

// Fragmento editado del manifiesto del manual (pág. 2).
export const philosophy = {
  title: 'La arquitectura nace del equilibrio entre la razón y la sensibilidad.',
  manifesto:
    'Nada es casual. Cada línea, cada encuentro y cada decisión responden a una lógica clara, donde la idea y la materia se encuentran en una misma dirección.',
  closing: 'Una arquitectura que busca permanencia, coherencia y belleza en lo esencial.',
} as const

export const process = {
  title: 'Del plano a la casa',
  intro:
    'Un mismo criterio de principio a fin: el proyecto, la obra y la casa terminada responden a la misma idea.',
  steps: [
    {
      word: 'Diseñar',
      text: 'Observar, escuchar y traducir: entender cómo se va a habitar el espacio antes de dibujar la primera línea.',
      visual: { kind: 'drawing', upTo: 0, label: "Corte A–A' · Proyecto" },
    },
    {
      word: 'Construir',
      text: 'Dirección de obra con el plano en la mano: fundaciones, estructura, muros y cubierta, cada etapa controlada.',
      visual: { kind: 'drawing', label: "Corte A–A' · Obra" },
    },
    {
      word: 'Habitar',
      text: 'La casa terminada: luz, recorrido y proporción pensados para quien la vive.',
      visual: {
        kind: 'photo',
        image: tempImage(
          'casa-terminada',
          [800, 1400, 2400],
          [16, 10],
          'Imagen de prueba: casa de una planta abierta al jardín',
        ),
      },
    },
  ],
} as const

export const studio = {
  title: site.name,
  lead: 'Diseñar es observar, escuchar y traducir: entender cómo se habita un espacio para construirlo con precisión y sentido.',
  bio: '[PENDIENTE: bio corta del cliente, 2 o 3 frases]',
  // [TEMPORAL] Planos sobre la mesa hasta tener la foto profesional de Alejandro.
  portrait: tempImage(
    'estudio',
    [600, 1000, 1600],
    [4, 5],
    'Imagen de prueba: planos de arquitectura con lápices y regla sobre una mesa',
  ),
} as const

export const contact = {
  // [CONFIRMAR] Alternativa aprobada a "Hacemos realidad tu sueño" (manual).
  title: 'Contanos tu proyecto.',
  intro:
    'Completá la ficha y se arma el mensaje. Lo mandás por WhatsApp y coordinamos una primera charla.',
} as const
