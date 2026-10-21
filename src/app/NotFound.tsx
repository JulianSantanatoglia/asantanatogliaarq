import { Logo } from '../components/brand/Logo'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SheetLabel } from '../components/ui/Label'
import { Dimension } from '../components/ui/Rule'
import { Sheet } from '../components/ui/Sheet'
import { site } from '../content/site'

export function Component() {
  const sheet = { index: '404', name: 'Sin plano' }
  return (
    <Sheet
      id="no-encontrada"
      sheet={sheet}
      theme="grafito"
      labelledBy="nf-title"
      className="theme-grafito flex min-h-svh items-center"
    >
      <Seo path="/404" title={`Página no encontrada · ${site.name}`} noindex />
      <Container className="flex flex-col items-start gap-10 pt-(--header-h)">
        <Logo variant="monogram" height="5rem" />
        <SheetLabel index={sheet.index} name={sheet.name} />
        <h1 id="nf-title" className="max-w-[18ch] text-h2 font-medium tracking-tight">
          Esta página no está en el proyecto.
        </h1>
        <Dimension className="w-full max-w-md">404</Dimension>
        <Button href="/" arrow>
          Volver al inicio
        </Button>
      </Container>
    </Sheet>
  )
}
