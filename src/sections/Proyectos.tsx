import { useRef } from 'react'
import { proyectosGallery } from '../animations/proyectos'
import { canAnimate } from '../animations/registry'
import { ProjectCard } from '../components/ProjectCard'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { SheetLabel } from '../components/ui/Label'
import { Sheet } from '../components/ui/Sheet'
import { caseId, projects } from '../content/projects'
import { sheets } from '../content/site'
import { useGSAP } from '../lib/gsap'
import { CasoDestacado } from './CasoDestacado'

export function Proyectos() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (ref.current && canAnimate('proyectos')) proyectosGallery(ref.current)
    },
    { scope: ref },
  )
  const featured = projects.find((p) => p.featured)

  return (
    <Sheet
      ref={ref}
      id="proyectos"
      sheet={sheets.proyectos}
      theme="arena"
      labelledBy="proyectos-title"
      className="proyectos theme-arena overflow-x-clip"
    >
      <div data-gallery-pin="" className="gallery-pin">
        <Container>
          <Grid className="gap-y-6">
            <SheetLabel
              index={sheets.proyectos.index}
              name={sheets.proyectos.name}
              className="col-span-4 lg:col-span-12"
            />
            <h2
              id="proyectos-title"
              className="col-span-4 text-h2 font-medium tracking-tight lg:col-span-6"
            >
              Obra terminada
            </h2>
          </Grid>
        </Container>
        <div
          data-track=""
          role="region"
          aria-label="Galería de proyectos"
          tabIndex={0}
          className="gallery-track"
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              caseHref={p.comparisons?.length ? `#${caseId(p.slug)}` : undefined}
            />
          ))}
        </div>
      </div>
      {featured && <CasoDestacado project={featured} />}
    </Sheet>
  )
}
