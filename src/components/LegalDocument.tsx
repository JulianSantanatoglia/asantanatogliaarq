import { LEGAL_UPDATED, type LegalPage } from '../content/legal'
import { Container } from './ui/Container'
import { Grid } from './ui/Grid'
import { Label, SheetLabel } from './ui/Label'
import { Rule } from './ui/Rule'
import { Sheet } from './ui/Sheet'

type Props = { page: LegalPage; sheet: { index: string; name: string } }

export function LegalDocument({ page, sheet }: Props) {
  return (
    <Sheet
      id="legal"
      sheet={sheet}
      theme="arena"
      labelledBy="legal-title"
      className="theme-arena pt-[calc(var(--header-h)+4rem)] pb-section"
    >
      <Container>
        <Grid className="gap-y-10">
          <div className="col-span-4 flex flex-col gap-6 lg:col-span-4">
            <SheetLabel index={sheet.index} name={sheet.name} />
            <h1 id="legal-title" className="text-h2 font-medium tracking-tight">
              {page.title}
            </h1>
            <Label as="p" muted>
              Última actualización: {LEGAL_UPDATED}
            </Label>
          </div>
          <div className="col-span-4 flex max-w-[68ch] flex-col gap-10 lg:col-span-7 lg:col-start-6">
            <p className="text-lead">{page.intro}</p>
            {page.sections.map((s) => (
              <section key={s.title} className="flex flex-col gap-4">
                <Rule />
                <h2 className="text-h3 font-medium">{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </Grid>
      </Container>
    </Sheet>
  )
}
