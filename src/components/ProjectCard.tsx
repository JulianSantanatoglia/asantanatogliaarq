import type { Project } from '../content/projects'
import { track } from '../lib/analytics'
import { Label } from './ui/Label'
import { Picture } from './ui/Picture'
import { Rule } from './ui/Rule'

type ProjectCardProps = { project: Project; caseHref?: string }

/** Imagen sin marco, línea de 1px y ficha técnica en etiquetas espaciadas. */
export function ProjectCard({ project, caseHref }: ProjectCardProps) {
  const facts = [project.location, project.type, project.year, project.area].filter(Boolean)
  const body = (
    <>
      <div className="aspect-[4/3] overflow-hidden bg-topo">
        <Picture
          image={project.cover}
          sizes="(min-width: 1024px) 36vw, 85vw"
          data-parallax=""
          className="project-card__img h-full object-cover"
        />
      </div>
      <Rule className="mt-5" />
      <div className="mt-4 flex items-start justify-between gap-6">
        <h3 className="text-h3 font-medium">{project.title}</h3>
        {caseHref && (
          <span aria-hidden="true" className="project-card__arrow pt-[0.3em] text-lead">
            →
          </span>
        )}
      </div>
      <Label as="p" muted className="mt-3">
        {facts.join(' · ')}
      </Label>
    </>
  )

  return (
    <article data-card="" className="project-card">
      {caseHref ? (
        <a
          href={caseHref}
          className="block"
          onClick={() => track('project_open', { project: project.slug })}
        >
          {body}
        </a>
      ) : (
        body
      )}
    </article>
  )
}
