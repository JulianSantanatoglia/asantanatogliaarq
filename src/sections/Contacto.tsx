import { WhatsAppBrief } from '../components/WhatsAppBrief'
import { Container } from '../components/ui/Container'
import { Grid } from '../components/ui/Grid'
import { Label, SheetLabel } from '../components/ui/Label'
import { Rule } from '../components/ui/Rule'
import { Sheet } from '../components/ui/Sheet'
import { contact, sheets, site } from '../content/site'
import { track } from '../lib/analytics'

export function Contacto() {
  const channels = [
    {
      k: 'Teléfono',
      v: site.phone.display,
      href: site.phone.href,
      onClick: () => track('click_phone', { location: 'contacto' }),
    },
    {
      k: 'Email',
      v: site.email,
      href: `mailto:${site.email}`,
      onClick: () => track('click_email', { location: 'contacto' }),
    },
    { k: 'Instagram', v: site.instagram.handle, href: site.instagram.href, external: true },
    { k: 'Zona', v: site.zone },
  ]

  return (
    <Sheet
      id="contacto"
      sheet={sheets.contacto}
      theme="negro"
      labelledBy="contacto-title"
      className="theme-negro py-section"
    >
      <Container>
        <Grid className="gap-y-12">
          <div className="col-span-4 flex flex-col gap-8 lg:col-span-6">
            <SheetLabel index={sheets.contacto.index} name={sheets.contacto.name} />
            <h2 id="contacto-title" className="text-h2 font-medium tracking-tight">
              {contact.title}
            </h2>
          </div>
          <p className="col-span-4 max-w-[40ch] self-end text-lead lg:col-span-5 lg:col-start-8">
            {contact.intro}
          </p>

          <div className="col-span-4 lg:col-span-12">
            <WhatsAppBrief />
          </div>

          <dl className="col-span-4 grid gap-x-gutter sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {channels.map((c) => (
              <div key={c.k} className="flex flex-col gap-1 py-3">
                <Rule className="mb-3" />
                <dt>
                  <Label muted>{c.k}</Label>
                </dt>
                <dd className="wrap-break-word">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="link-line"
                      onClick={c.onClick}
                      {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                    >
                      {c.v}
                    </a>
                  ) : (
                    c.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Grid>
      </Container>
    </Sheet>
  )
}
