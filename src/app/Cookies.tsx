import { LegalDocument } from '../components/LegalDocument'
import { Seo } from '../components/Seo'
import { cookies } from '../content/legal'
import { site } from '../content/site'

export function Component() {
  return (
    <>
      <Seo
        path="/cookies"
        title={`${cookies.title} · ${site.name}`}
        description="Qué cookies usa el sitio de Alejandro E. Santanatoglia, arquitecto, y cómo cambiar tu elección."
      />
      <LegalDocument page={cookies} sheet={{ index: 'A2', name: 'Cookies' }} />
    </>
  )
}
