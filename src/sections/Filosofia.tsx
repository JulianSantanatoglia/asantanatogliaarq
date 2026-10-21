import { useRef } from 'react'
import { filosofiaReveal } from '../animations/filosofia'
import { canAnimate } from '../animations/registry'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { SheetLabel } from '../components/ui/Label'
import { Sheet } from '../components/ui/Sheet'
import { philosophy, sheets } from '../content/site'
import { useGSAP } from '../lib/gsap'

export function Filosofia() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (ref.current && canAnimate('filosofia')) filosofiaReveal(ref.current)
    },
    { scope: ref },
  )
  const words = philosophy.manifesto.split(' ')

  return (
    <Sheet
      ref={ref}
      id="filosofia"
      sheet={sheets.filosofia}
      theme="negro"
      labelledBy="filosofia-title"
      className="theme-negro py-section"
    >
      <Container>
        <Grid className="gap-y-12 lg:gap-y-20">
          <SheetLabel
            index={sheets.filosofia.index}
            name={sheets.filosofia.name}
            className="col-span-4 lg:col-span-12"
          />
          <h2
            id="filosofia-title"
            className="col-span-4 max-w-[26ch] text-h3 font-medium lg:col-span-5"
          >
            {philosophy.title}
          </h2>
          {/* El lector de pantalla lee la frase entera; las palabras partidas son solo visuales */}
          <p
            data-lit=""
            className="col-span-4 text-h2 font-medium tracking-tight lg:col-span-10 lg:col-start-2"
          >
            <span className="sr-only">{philosophy.manifesto}</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span key={i} data-word="">
                  {w}
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </p>
          <p className="col-span-4 max-w-[34ch] text-lead text-(--theme-muted) lg:col-span-4 lg:col-start-8">
            {philosophy.closing}
          </p>
        </Grid>
      </Container>
    </Sheet>
  )
}
