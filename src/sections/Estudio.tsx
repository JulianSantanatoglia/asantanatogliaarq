import { useRef } from 'react'
import { estudioReveal } from '../animations/estudio'
import { canAnimate } from '../animations/registry'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { Label, SheetLabel } from '../components/ui/Label'
import { Rule } from '../components/ui/Rule'
import { Sheet } from '../components/ui/Sheet'
import { WipeFigure } from '../components/ui/WipeFigure'
import { sheets, site, studio } from '../content/site'
import { useGSAP } from '../lib/gsap'

export function Estudio() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (ref.current && canAnimate('estudio')) estudioReveal(ref.current)
    },
    { scope: ref },
  )

  const facts = [
    { k: 'Profesional', v: `${site.name} · ${site.role}` },
    { k: 'Matrícula', v: `${site.matricula} · ${site.colegio}` },
    { k: 'Zona de trabajo', v: site.zone },
  ]

  return (
    <Sheet
      ref={ref}
      id="estudio"
      sheet={sheets.estudio}
      theme="arena"
      labelledBy="estudio-title"
      className="theme-arena py-section"
    >
      <Container>
        <Grid className="items-end gap-y-12">
          <WipeFigure
            image={studio.portrait}
            className="col-span-4 aspect-[4/5] lg:col-span-5"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="col-span-4 flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            <SheetLabel index={sheets.estudio.index} name={sheets.estudio.name} />
            <h2 id="estudio-title" className="text-h2 font-medium tracking-tight">
              {studio.title}
            </h2>
            <p className="max-w-[40ch] text-lead">{studio.lead}</p>
            <p className="max-w-[60ch]">{studio.bio}</p>
            <dl className="flex flex-col">
              {facts.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 py-4">
                  <Rule className="mb-3" />
                  <dt>
                    <Label muted>{f.k}</Label>
                  </dt>
                  <dd className="text-body">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Grid>
      </Container>
    </Sheet>
  )
}
