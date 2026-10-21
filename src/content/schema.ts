import { seo, site } from './site'

const isPending = (v: string) => v.startsWith('[PENDIENTE')

/** JSON-LD de la home: el estudio (ProfessionalService) y el arquitecto (Person). Sin dirección exacta. */
export function homeJsonLd() {
  const person = {
    '@type': 'Person',
    '@id': `${site.url}/#alejandro`,
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: site.phone.intl,
    url: site.url,
    sameAs: [site.instagram.href],
  }
  const service = {
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#estudio`,
    name: `${site.name} · ${site.role}`,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}${seo.ogImage.src}`,
    description: seo.description,
    telephone: site.phone.intl,
    email: site.email,
    sameAs: [site.instagram.href],
    founder: { '@id': person['@id'] },
    // [PENDIENTE] areaServed cuando se confirme la zona de trabajo.
    ...(isPending(site.zone) ? {} : { areaServed: site.zone }),
  }
  return { '@context': 'https://schema.org', '@graph': [service, person] }
}
