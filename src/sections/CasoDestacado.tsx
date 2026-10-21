import { BeforeAfter } from '../components/BeforeAfter/BeforeAfter'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { Label } from '../components/ui/Label'
import { Rule } from '../components/ui/Rule'
import { caseId, type Project } from '../content/projects'
import { trackOncePerSession } from '../lib/analytics'

type Props = { project: Project }

/** Caso destacado con el visor antes/después ("La línea que transforma"). */
export function CasoDestacado({ project }: Props) {
  const comparison = project.comparisons?.[0]
  const id = caseId(project.slug)
  const facts = [
    { k: 'Ubicación', v: project.location },
    { k: 'Tipo', v: project.type },
    { k: 'Año', v: project.year ?? '[PENDIENTE]' },
    { k: 'Superficie', v: project.area ?? '[PENDIENTE]' },
  ]

  return (
    <article id={id} aria-labelledby={`${id}-title`} className="pb-section">
      <Container>
        <Grid className="gap-y-10">
          <div className="col-span-4 flex flex-col gap-6 lg:col-span-5">
            <h3 id={`${id}-title`} className="text-h2 font-medium tracking-tight">
              {project.title}
            </h3>
            <p className="max-w-[36ch] text-lead">{project.summary}</p>
          </div>
          <dl className="col-span-4 grid grid-cols-2 gap-x-gutter gap-y-6 self-end lg:col-span-6 lg:col-start-7 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="flex flex-col gap-2">
                <Rule />
                <dt>
                  <Label muted>{f.k}</Label>
                </dt>
                <dd className="text-small">{f.v}</dd>
              </div>
            ))}
          </dl>
          {comparison && (
            <div className="col-span-4 lg:col-span-12">
              <BeforeAfter
                label={comparison.label}
                before={comparison.before}
                after={comparison.after}
                onInteract={() =>
                  trackOncePerSession(
                    'before_after_interact',
                    `${project.slug}:${comparison.label}`,
                    {
                      project: project.slug,
                      view: comparison.label,
                    },
                  )
                }
              />
            </div>
          )}
        </Grid>
      </Container>
    </article>
  )
}
