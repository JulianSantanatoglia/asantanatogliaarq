import { useRef } from 'react'
import { procesoScroll } from '../animations/proceso'
import { canAnimate } from '../animations/registry'
import { ObraDrawing } from '../components/ObraDrawing'
import { Container } from '../components/ui/Container'
import { Label, SheetLabel } from '../components/ui/Label'
import { Dimension } from '../components/ui/Rule'
import { Sheet } from '../components/ui/Sheet'
import { WipeFigure } from '../components/ui/WipeFigure'
import { process, sheets } from '../content/site'
import { useGSAP } from '../lib/gsap'

export function Proceso() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (ref.current && canAnimate('proceso')) procesoScroll(ref.current)
    },
    { scope: ref },
  )

  return (
    <Sheet
      ref={ref}
      id="proceso"
      sheet={sheets.proceso}
      theme="blanco"
      labelledBy="proceso-title"
      className="proceso theme-blanco"
    >
      <div data-proceso-pin="" className="proceso-pin">
        <Container>
          <div className="proceso-grid">
            <header className="proceso-head flex flex-col gap-6">
              <SheetLabel index={sheets.proceso.index} name={sheets.proceso.name} />
              <h2 id="proceso-title" className="text-h2 font-medium tracking-tight">
                {process.title}
              </h2>
              <p className="max-w-[42ch] text-body">{process.intro}</p>
            </header>

            <ol role="list" className="proceso-list">
              {process.steps.map((step, i) => (
                <li role="listitem" key={step.word} data-step="" className="step">
                  <div className="step__text flex gap-5">
                    <Label muted className="pt-[0.55em]">
                      {String(i + 1).padStart(2, '0')}
                    </Label>
                    <div className="flex flex-col gap-2">
                      <h3 className="step__word text-h3 uppercase">{step.word}</h3>
                      <p className="step__desc max-w-[40ch] text-body">{step.text}</p>
                    </div>
                  </div>
                  {step.visual.kind === 'drawing' ? (
                    <ObraDrawing
                      upTo={'upTo' in step.visual ? step.visual.upTo : undefined}
                      label={step.visual.label}
                      className="step__fig aspect-[16/10]"
                    />
                  ) : (
                    <WipeFigure
                      image={step.visual.image}
                      className="step__fig aspect-[16/10]"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  )}
                </li>
              ))}
            </ol>

            <div data-cota="" className="proceso-cota">
              <Dimension>
                <span data-cota-label="">01 / 03</span>
              </Dimension>
            </div>
          </div>
        </Container>
      </div>
    </Sheet>
  )
}
