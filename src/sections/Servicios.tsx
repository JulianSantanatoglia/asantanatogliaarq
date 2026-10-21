import { useRef } from 'react'
import { canAnimate } from '../animations/registry'
import { serviciosLines } from '../animations/servicios'
import { MonogramPattern } from '../components/brand/MonogramPattern'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { Label, SheetLabel } from '../components/ui/Label'
import { Rule } from '../components/ui/Rule'
import { Sheet } from '../components/ui/Sheet'
import { services } from '../content/services'
import { sheets } from '../content/site'
import { useGSAP } from '../lib/gsap'

// Sobre topo solo hay texto grande en blanco (3.99): todo el texto de la sección es ≥ 24px
// o etiqueta en Medium sobre bloque. Ver la tabla de contraste de alejandro.md §2.
export function Servicios() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (ref.current && canAnimate('servicios')) serviciosLines(ref.current)
    },
    { scope: ref },
  )

  return (
    <Sheet
      ref={ref}
      id="servicios"
      sheet={sheets.servicios}
      theme="topo"
      labelledBy="servicios-title"
      className="theme-topo isolate overflow-hidden py-section"
    >
      <MonogramPattern opacity="topo" moduleHeight={300} className="-z-10" />
      <Container>
        <Grid className="gap-y-12">
          <div className="col-span-4 flex flex-col gap-6 lg:col-span-4">
            {/* Texto chico sobre topo no alcanza contraste: el rótulo va sobre bloque grafito */}
            <SheetLabel
              index={sheets.servicios.index}
              name={sheets.servicios.name}
              className="self-start bg-grafito px-3 py-2 text-arena"
            />
            <h2 id="servicios-title" className="text-h2 font-medium tracking-tight">
              {services.title}
            </h2>
            <span className="self-start bg-grafito px-3 py-2 text-arena">
              <Label>{services.pendingNote}</Label>
            </span>
          </div>

          <ul data-services="" className="col-span-4 lg:col-span-8 lg:col-start-5">
            {services.items.map((s, i) => (
              <li key={s.title} className="service group">
                <Rule />
                <div className="grid gap-x-gutter gap-y-3 py-8 lg:grid-cols-8">
                  <span className="text-large tabular-nums lg:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-3 lg:col-span-7">
                    <h3 className="text-h3 font-medium">{s.title}</h3>
                    <p className="max-w-[38ch] text-large">{s.text}</p>
                  </div>
                </div>
              </li>
            ))}
            <li aria-hidden="true">
              <Rule />
            </li>
          </ul>
        </Grid>
      </Container>
    </Sheet>
  )
}
