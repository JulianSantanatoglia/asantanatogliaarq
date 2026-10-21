import { Head } from 'vite-react-ssg'
import { seo, site } from '../content/site'

type SeoProps = {
  title?: string
  description?: string
  /** Ruta de la página, con barra inicial ("/", "/privacidad"). */
  path: string
  noindex?: boolean
  /** Datos estructurados (JSON-LD) de la página. */
  jsonLd?: object
}

/** Metas, canonical, Open Graph y Twitter card de cada página. Se prerenderizan en el HTML. */
export function Seo({
  title = seo.title,
  description = seo.description,
  path,
  noindex,
  jsonLd,
}: SeoProps) {
  const url = `${site.url}${path}`
  const image = `${site.url}${seo.ogImage.src}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content={`${site.name} · ${site.role}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(seo.ogImage.width)} />
      <meta property="og:image:height" content={String(seo.ogImage.height)} />
      <meta property="og:image:alt" content={seo.ogImage.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  )
}
