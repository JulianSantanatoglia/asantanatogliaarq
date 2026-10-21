import { Seo } from '../components/Seo'
import { homeJsonLd } from '../content/schema'
import { Contacto } from '../sections/Contacto'
import { Estudio } from '../sections/Estudio'
import { Filosofia } from '../sections/Filosofia'
import { Hero } from '../sections/Hero'
import { Proceso } from '../sections/Proceso'
import { Proyectos } from '../sections/Proyectos'
import { Servicios } from '../sections/Servicios'

export function Component() {
  return (
    <>
      <Seo path="/" jsonLd={homeJsonLd()} />
      <Hero />
      <Filosofia />
      <Proceso />
      <Proyectos />
      <Servicios />
      <Estudio />
      <Contacto />
    </>
  )
}
