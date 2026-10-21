import { useRef } from 'react'
import { heroIntro } from '../animations/hero'
import { canAnimate } from '../animations/registry'
import { Logo } from '../components/brand/Logo'
import { MonogramPattern } from '../components/brand/MonogramPattern'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { SheetLabel } from '../components/ui/Label'
import { Sheet } from '../components/ui/Sheet'
import { hero, sheets, site } from '../content/site'
import { useGSAP } from '../lib/gsap'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (ref.current && canAnimate('hero')) heroIntro(ref.current)
    },
    { scope: ref },
  )

  return (
    <Sheet
      ref={ref}
      id="inicio"
      sheet={sheets.inicio}
      theme="grafito"
      labelledBy="hero-title"
      className="theme-grafito isolate overflow-hidden"
    >
      {/* Trama de la portada del manual, recortada en diagonal */}
      <div aria-hidden="true" className="hero-pattern absolute inset-0 -z-10">
        <MonogramPattern moduleHeight={260} />
      </div>

      <Container className="flex min-h-svh flex-col pt-[calc(var(--header-h)+1.5rem)] pb-gutter">
        <Grid className="flex-1 grid-rows-[auto_1fr_auto_auto] gap-y-10 lg:gap-y-14">
          <SheetLabel
            index={sheets.inicio.index}
            name={sheets.inicio.name}
            className="col-span-4 self-start lg:col-span-6"
          />

          <h1
            id="hero-title"
            className="col-span-4 self-center justify-self-start lg:col-span-6 lg:col-start-7"
          >
            <span className="sr-only">
              {site.name}, {site.role.toLowerCase()}
            </span>
            <span data-hero-logo="" className="hero-logo block">
              <Logo variant="lockup" drawable clearspace height="var(--hero-logo-height)" />
            </span>
          </h1>

          <div className="col-span-4 flex flex-col items-start gap-8 lg:col-span-5 lg:col-start-8">
            <p className="max-w-[34ch] text-lead">{hero.proposal}</p>
            <Button href={hero.cta.href} arrow>
              {hero.cta.label}
            </Button>
          </div>

          <p className="col-span-4 flex flex-col text-triad-stack leading-[0.9] tracking-display uppercase lg:col-span-12 lg:flex-row lg:items-baseline lg:justify-between lg:text-triad-line">
            {hero.triad.map((t, i) => (
              <span key={t.word} className="contents">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden font-normal lg:inline">
                    ·
                  </span>
                )}
                <span className={t.strong ? 'font-bold' : 'font-normal'}>{t.word}</span>
              </span>
            ))}
          </p>
        </Grid>
      </Container>
    </Sheet>
  )
}
