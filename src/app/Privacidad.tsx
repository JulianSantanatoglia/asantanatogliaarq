import { LegalDocument } from '../components/LegalDocument'
import { Seo } from '../components/Seo'
import { privacy } from '../content/legal'
import { site } from '../content/site'

export function Component() {
  return (
    <>
      <Seo
        path="/privacidad"
        title={`${privacy.title} · ${site.name}`}
        description="Qué datos trata el sitio de Alejandro E. Santanatoglia, arquitecto, y cómo ejercer tus derechos (Ley 25.326)."
      />
      <LegalDocument page={privacy} sheet={{ index: 'A1', name: 'Privacidad' }} />
    </>
  )
}
