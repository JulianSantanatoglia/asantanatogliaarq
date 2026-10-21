import { useEffect, useId, useRef, type CSSProperties } from 'react'
import { headerBehavior } from '../animations/header'
import { Logo } from '../components/brand/Logo'
import { ProgressRuler } from '../components/brand/ProgressRuler'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Label } from '../components/ui/Label'
import { nav, site } from '../content/site'
import { track } from '../lib/analytics'
import { useGSAP } from '../lib/gsap'

const supportsPopover = () =>
  typeof HTMLElement !== 'undefined' && Object.hasOwn(HTMLElement.prototype, 'popover')

export function Header() {
  const ref = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useGSAP(() => (ref.current ? headerBehavior(ref.current) : undefined), { scope: ref })

  // El menú es un popover nativo: abre, cierra con Esc y devuelve el foco sin depender de React,
  // y vive en la capa superior (no lo atrapa el transform del header al esconderse).
  // Acá solo se suma lo que el navegador no hace: bloquear el scroll de fondo.
  // (Con teclado, Tab desde el botón entra al menú: el popover sigue al botón en el orden de foco.)
  useEffect(() => {
    const menu = menuRef.current
    const header = ref.current
    if (!menu || !header) return
    const onToggle = (e: Event) => {
      const open = (e as ToggleEvent).newState === 'open'
      header.dataset.open = String(open)
      document.documentElement.style.overflow = open ? 'hidden' : ''
    }
    menu.addEventListener('toggle', onToggle)
    return () => {
      menu.removeEventListener('toggle', onToggle)
      document.documentElement.style.overflow = ''
    }
  }, [])

  const close = () => {
    const menu = menuRef.current
    if (!menu) return
    if (supportsPopover()) {
      if (menu.matches(':popover-open')) menu.hidePopover()
    } else {
      menu.removeAttribute('data-fallback-open')
    }
  }

  // Navegadores sin Popover API (Safari < 17): se abre con un atributo.
  const fallbackToggle = () => {
    if (supportsPopover()) return
    const menu = menuRef.current
    const open = !menu?.hasAttribute('data-fallback-open')
    menu?.toggleAttribute('data-fallback-open', open)
    if (ref.current) ref.current.dataset.open = String(open)
  }

  const items = [...nav, { href: '#contacto', label: 'Contacto' }]

  return (
    <header
      ref={ref}
      data-theme="grafito"
      data-open="false"
      className="site-header fixed inset-x-0 top-0 z-50"
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <a href="/#inicio" className="block" onClick={close}>
          <Logo
            variant="lockup"
            height="clamp(2.25rem, 1.9rem + 0.8vw, 2.75rem)"
            clearspace
            title={`${site.name}, ${site.role.toLowerCase()}. Ir al inicio`}
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={`/${item.href}`} className="link-line label">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/#contacto" className="hidden sm:inline-flex">
            Contacto
          </Button>
          <button
            type="button"
            className="menu-toggle btn lg:hidden"
            popoverTarget={menuId}
            onClick={fallbackToggle}
          >
            <span className="menu-toggle__label menu-toggle__label--open">Menú</span>
            <span className="menu-toggle__label menu-toggle__label--close" aria-hidden="true">
              Cerrar
            </span>
          </button>
        </div>
      </Container>

      <ProgressRuler orientation="horizontal" className="xl:hidden" />

      <div
        ref={menuRef}
        id={menuId}
        popover="auto"
        aria-label="Menú"
        className="site-menu theme-negro lg:hidden"
      >
        <Container className="flex min-h-full flex-col justify-between gap-12 py-10">
          <nav aria-label="Principal (móvil)">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <li
                  key={item.href}
                  className="site-menu__item"
                  style={{ '--i': i } as CSSProperties}
                >
                  <a
                    href={`/${item.href}`}
                    onClick={close}
                    className="flex items-baseline gap-6 py-5 text-h3 font-medium"
                  >
                    <Label muted>{String(i + 1).padStart(2, '0')}</Label>
                    {item.label}
                  </a>
                  <span aria-hidden="true" className="site-menu__rule" />
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="site-menu__item flex flex-col items-start gap-4"
            style={{ '--i': items.length } as CSSProperties}
          >
            <Button
              href={site.whatsapp}
              variant="solid"
              arrow
              target="_blank"
              rel="noopener"
              onClick={() => {
                track('click_whatsapp', { location: 'menu' })
                close()
              }}
            >
              WhatsApp
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="link-line"
              onClick={() => track('click_email', { location: 'menu' })}
            >
              {site.email}
            </a>
          </div>
        </Container>
      </div>
    </header>
  )
}
