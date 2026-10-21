import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { ProgressRuler } from '../components/brand/ProgressRuler'
import { CookieBanner } from '../components/CookieBanner'
import { Footer } from '../sections/Footer'
import { Header } from '../sections/Header'
import '../styles/index.css'

declare global {
  interface Window {
    __hydrated?: boolean
  }
}

export function Layout() {
  useEffect(() => {
    // El script inline de index.html quita .js si la app tarda demasiado; al hidratar vuelve.
    window.__hydrated = true
    document.documentElement.classList.add('js')
  }, [])

  return (
    <>
      <Head>
        <html lang="es-AR" />
        {/* El HTML prerenderizado pone estas metas al principio del head: el charset va primero */}
        <meta charSet="utf-8" />
      </Head>
      <a href="#contenido" className="skip-link btn btn--solid theme-negro">
        Saltar al contenido
      </a>
      <Header />
      <ProgressRuler orientation="vertical" className="hidden xl:block" />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
