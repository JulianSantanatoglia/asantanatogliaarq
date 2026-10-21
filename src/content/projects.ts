export type ImageSource = { type: 'image/avif' | 'image/webp'; srcSet: string }

export type ImageAsset = {
  src: string
  srcSet?: string
  sizes?: string
  /** Formatos modernos para <picture> (AVIF primero). */
  sources?: ImageSource[]
  alt: string
  width: number
  height: number
}

/**
 * [TEMPORAL] Foto de prueba de Unsplash (licencia Unsplash), recortada y comprimida en
 * public/img/temp/. Créditos y reemplazos: IMAGENES-TEMPORALES.md. Reemplazar por fotos reales.
 */
export function tempImage(
  name: string,
  widths: number[],
  ratio: [number, number],
  alt: string,
): ImageAsset {
  const [rw, rh] = ratio
  const largest = widths[widths.length - 1]
  const set = (ext: string) => widths.map((w) => `/img/temp/${name}-${w}.${ext} ${w}w`).join(', ')
  const mid = widths[Math.min(1, widths.length - 1)]
  return {
    src: `/img/temp/${name}-${mid}.webp`,
    srcSet: set('webp'),
    sources: [{ type: 'image/avif', srcSet: set('avif') }],
    alt,
    width: largest,
    height: Math.round((largest * rh) / rw),
  }
}

export type Comparison = { label: string; before: ImageAsset; after: ImageAsset }

export type Project = {
  slug: string
  title: string
  location: string
  type: 'Obra nueva' | 'Remodelación' | 'Ampliación' | 'Dirección de obra'
  year?: number
  area?: string
  summary: string
  cover: ImageAsset
  gallery: ImageAsset[]
  plans?: ImageAsset[]
  comparisons?: Comparison[]
  featured?: boolean
  /** Marcador de maqueta: no es una obra real. Borrar cuando lleguen los proyectos. */
  placeholder?: boolean
}

/** Ancla del caso de un proyecto dentro de la sección Proyectos. */
export const caseId = (slug: string) => `caso-${slug}`

const W3 = [800, 1400, 2400]
const W2 = [800, 1400]

export const projects: Project[] = [
  {
    slug: 'casa-carilo',
    title: 'Casa Cariló',
    location: 'Cariló, Buenos Aires',
    type: 'Remodelación',
    summary: 'Proyecto de remodelación, reordenamiento funcional y creación de nuevos espacios.',
    cover: tempImage(
      'carilo-cover',
      W2,
      [4, 3],
      'Imagen de prueba: casa de dos plantas con fachada de madera entre árboles',
    ),
    gallery: [],
    comparisons: [
      {
        label: 'Fachada',
        // [TEMPORAL] El "antes" es la misma foto desaturada: solo sirve para probar el visor.
        before: tempImage(
          'carilo-antes',
          W3,
          [3, 2],
          'Imagen de prueba: fachada antes de la remodelación, en blanco y negro',
        ),
        after: tempImage(
          'carilo-despues',
          W3,
          [3, 2],
          'Imagen de prueba: fachada después de la remodelación, con revestimiento de madera',
        ),
      },
    ],
    featured: true,
  },
  // [TEMPORAL] Proyectos de prueba para revisar la galería. Reemplazar por obras reales del cliente.
  {
    slug: 'prueba-2',
    title: 'Casa con pileta',
    location: '[PENDIENTE]',
    type: 'Obra nueva',
    summary: '[PENDIENTE]',
    cover: tempImage(
      'proyecto-2',
      W2,
      [4, 3],
      'Imagen de prueba: casa moderna de dos plantas con pileta',
    ),
    gallery: [],
    placeholder: true,
  },
  {
    slug: 'prueba-3',
    title: 'Casa blanca',
    location: '[PENDIENTE]',
    type: 'Obra nueva',
    summary: '[PENDIENTE]',
    cover: tempImage(
      'proyecto-3',
      W2,
      [4, 3],
      'Imagen de prueba: casa blanca de volúmenes simples entre pinos',
    ),
    gallery: [],
    placeholder: true,
  },
  {
    slug: 'prueba-4',
    title: 'Casa de hormigón',
    location: '[PENDIENTE]',
    type: 'Ampliación',
    summary: '[PENDIENTE]',
    cover: tempImage(
      'proyecto-4',
      W2,
      [4, 3],
      'Imagen de prueba: fachada de hormigón con ventanales de doble altura',
    ),
    gallery: [],
    placeholder: true,
  },
]
