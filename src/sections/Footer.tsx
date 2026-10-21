import type { ReactNode } from 'react'
import { Logo } from '../components/brand/Logo'
import { Container } from '../components/ui/Container'
import { Label } from '../components/ui/Label'
import { sheetCount, sheets, site } from '../content/site'
import { track } from '../lib/analytics'
import { openConsent } from '../lib/consent'

function Cell({
  k,
  children,
  className = '',
}: {
  k: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 border-(--theme-muted) p-5 ${className}`}>
      <Label muted>{k}</Label>
      <div className="text-small">{children}</div>
    </div>
  )
}

/** Footer como rótulo de plano: el cierre de la última lámina. */
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      data-sheet={sheets.rotulo.index}
      data-sheet-name={sheets.rotulo.name}
      data-theme="negro"
      className="theme-negro pb-gutter"
    >
      <Container>
        <div className="grid border border-(--theme-muted) md:grid-cols-2 lg:grid-cols-12">
          <div className="flex items-center border-b border-(--theme-muted) p-5 md:col-span-2 lg:col-span-3 lg:border-r lg:border-b-0">
            <Logo
              variant="typographic"
              height="3.25rem"
              clearspace
              title={`${site.name}, ${site.role.toLowerCase()}`}
            />
          </div>
          <Cell
            k="Profesional"
            className="border-b lg:col-span-3 lg:border-r lg:border-b-0 md:border-r"
          >
            {site.name}
            <br />
            {site.role}
          </Cell>
          <Cell k="Matrícula" className="border-b lg:col-span-2 lg:border-r lg:border-b-0">
            <span className="tabular-nums">{site.matricula}</span>
            <br />
            {site.colegio}
          </Cell>
          <Cell
            k="Contacto"
            className="border-b md:border-r md:border-b-0 lg:col-span-2 lg:border-r"
          >
            <a
              href={site.phone.href}
              className="link-line"
              onClick={() => track('click_phone', { location: 'footer' })}
            >
              {site.phone.display}
            </a>
            <br />
            <a
              href={`mailto:${site.email}`}
              className="link-line break-all"
              onClick={() => track('click_email', { location: 'footer' })}
            >
              {site.email}
            </a>
          </Cell>
          <Cell k="Lámina" className="lg:col-span-2">
            <span className="text-h3 font-medium tabular-nums">
              {sheets.rotulo.index} de {String(sheetCount).padStart(2, '0')}
            </span>
          </Cell>
        </div>
        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <Label as="p" muted>
            © {year} {site.name}
          </Label>
          <nav aria-label="Legales">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              <li>
                <a href="/privacidad" className="link-line label">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/cookies" className="link-line label">
                  Cookies
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="link-line label cursor-pointer"
                  onClick={openConsent}
                >
                  Preferencias de cookies
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
