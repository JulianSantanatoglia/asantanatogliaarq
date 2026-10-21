import type { ReactNode } from 'react'
import { Head } from 'vite-react-ssg'
import { BeforeAfter } from '../components/BeforeAfter/BeforeAfter'
import { Logo } from '../components/brand/Logo'
import { MonogramPattern } from '../components/brand/MonogramPattern'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Grid, GridLines } from '../components/ui/Grid'
import { Label, SheetLabel } from '../components/ui/Label'
import { Dimension, Rule } from '../components/ui/Rule'
import { projects } from '../content/projects'

const colors = [
  {
    name: 'grafito',
    hex: '#45484F',
    rgb: '69 · 72 · 79',
    use: 'Principal. Hero, secciones oscuras',
    cls: 'bg-grafito text-arena',
  },
  {
    name: 'negro',
    hex: '#1C1C1C',
    rgb: '28 · 28 · 28',
    use: 'Texto sobre claro, footer',
    cls: 'bg-negro text-arena',
  },
  {
    name: 'arena',
    hex: '#D3CFC6',
    rgb: '211 · 207 · 198',
    use: 'Fondo claro principal',
    cls: 'bg-arena text-negro',
  },
  {
    name: 'topo',
    hex: '#837F76',
    rgb: '131 · 127 · 118',
    use: 'Bloques de materia. Solo texto grande',
    cls: 'bg-topo text-blanco',
  },
  {
    name: 'gris',
    hex: '#8A8B8F',
    rgb: '138 · 139 · 143',
    use: 'Líneas, cotas, texto secundario sobre negro',
    cls: 'bg-gris text-negro',
  },
  {
    name: 'blanco',
    hex: '#FFFFFF',
    rgb: '255 · 255 · 255',
    use: 'Soporte de plantas y láminas',
    cls: 'bg-blanco text-negro',
  },
]

const contrast = [
  { bg: 'theme-arena', text: 'Negro sobre arena', ratio: '10.96' },
  { bg: 'theme-grafito', text: 'Arena sobre grafito', ratio: '5.89' },
  { bg: 'bg-grafito text-blanco', text: 'Blanco sobre grafito', ratio: '9.16' },
  { bg: 'bg-negro text-gris', text: 'Gris sobre negro', ratio: '5.01' },
  { bg: 'theme-blanco', text: 'Negro sobre blanco', ratio: '18.1' },
  { bg: 'theme-topo', text: 'Blanco sobre topo · solo grande', ratio: '3.99', large: true },
]

function Block({ index, name, children }: { index: string; name: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-8 border-t border-gris py-16">
      <SheetLabel index={index} name={name} />
      {children}
    </section>
  )
}

export function Component() {
  const comparison = projects[0].comparisons![0]
  return (
    <div className="theme-arena">
      <Head>
        <title>Sistema · solo desarrollo</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Container className="py-16">
        <header className="flex flex-col gap-4 pb-8">
          <Label muted>Solo en desarrollo · no se publica</Label>
          <h1 className="text-h2 font-medium tracking-tight">Sistema base</h1>
        </header>

        <Block index="S1" name="Color">
          <div className="grid grid-cols-2 gap-gutter md:grid-cols-3 lg:grid-cols-6">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-3">
                <div className={`flex aspect-square items-end p-4 ${c.cls}`}>
                  <span className="label">{c.name}</span>
                </div>
                <span className="text-small tabular-nums">{c.hex}</span>
                <span className="text-small tabular-nums">{c.rgb}</span>
                <span className="text-small text-grafito">{c.use}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-gutter md:grid-cols-3">
            {contrast.map((c) => (
              <div key={c.text} className={`p-6 ${c.bg}`}>
                <p className={c.large ? 'text-h3 font-medium' : 'text-body'}>{c.text}</p>
                <span className="label">{c.ratio} : 1</span>
              </div>
            ))}
          </div>
          <p className="text-small text-grafito">
            Prohibido para texto: gris o topo sobre arena y gris o topo sobre grafito.
          </p>
        </Block>

        <Block index="S2" name="Tipografía">
          <div className="flex flex-col gap-6">
            <p className="text-display font-medium tracking-display">Del trazo a la obra</p>
            <p className="text-h2 font-medium tracking-tight">Titular de sección · h2</p>
            <p className="text-h3 font-medium">Subtítulo · h3</p>
            <p className="max-w-[60ch] text-lead">
              Diseñar es observar, escuchar y traducir: entender cómo se habita un espacio para
              construirlo con precisión y sentido.
            </p>
            <p className="max-w-[65ch]">
              Cuerpo de texto en Regular. Nada es casual. Cada línea, cada encuentro y cada decisión
              responden a una lógica clara, donde la idea y la materia se encuentran en una misma
              dirección.
            </p>
            <p className="text-small">Texto chico · 180 m² · 2025 · 12,40 m</p>
            <Label>Etiqueta · Arquitecto</Label>
            <p className="text-h3 uppercase">
              <span className="font-normal">Diseñar · </span>
              <span className="font-bold">Construir</span>
              <span className="font-normal"> · Habitar</span>
            </p>
            <p className="text-small text-grafito">
              Neue Montreal: Regular 400 · Medium 500 · Bold 700. [PENDIENTE: .woff2 con licencia;
              mientras tanto se ve el fallback Helvetica Neue / Arial.]
            </p>
          </div>
        </Block>

        <Block index="S3" name="Logo">
          <div className="grid gap-gutter md:grid-cols-2">
            <div className="flex items-center justify-center bg-arena p-10 text-topo outline outline-gris">
              <Logo height="7rem" clearspace title="Lockup topo sobre arena" />
            </div>
            <div className="flex items-center justify-center bg-topo p-10 text-arena">
              <Logo height="7rem" clearspace title="Lockup arena sobre topo" />
            </div>
            <div className="flex items-center justify-center bg-grafito p-10 text-blanco">
              <Logo height="7rem" clearspace title="Lockup blanco sobre grafito" />
            </div>
            <div className="flex items-center justify-center bg-negro p-10 text-blanco">
              <Logo height="7rem" clearspace title="Lockup blanco sobre negro" />
            </div>
            <div className="flex items-center justify-center bg-blanco p-10 text-grafito">
              <Logo variant="typographic" height="5rem" clearspace title="Versión tipográfica" />
            </div>
            <div className="flex items-center justify-center bg-grafito p-10 text-arena">
              <Logo variant="monogram" height="7rem" clearspace title="Monograma" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label muted>Área de resguardo (pág. 6): 24,3 % del alto del logo</Label>
            <div className="self-start bg-blanco text-grafito outline-1 outline-gris outline-dashed">
              <Logo height="9rem" clearspace title="Lockup con área de resguardo" />
            </div>
          </div>
        </Block>

        <Block index="S4" name="Trama">
          <div className="grid gap-gutter md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-grafito">
              <MonogramPattern moduleHeight={180} />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-topo">
              <MonogramPattern moduleHeight={180} opacity="topo" />
            </div>
          </div>
        </Block>

        <Block index="S5" name="Botones y links">
          <div className="flex flex-wrap items-center gap-6">
            <Button arrow>Ver proyectos</Button>
            <Button variant="solid">Enviar consulta</Button>
            <a href="#s5" className="link-line">
              Link de texto
            </a>
          </div>
          <div className="theme-grafito flex flex-wrap items-center gap-6 p-10">
            <Button arrow>Ver proyectos</Button>
            <Button variant="solid">Contacto</Button>
            <a href="#s5" className="link-line">
              Link de texto
            </a>
          </div>
        </Block>

        <Block index="S6" name="Rótulos, líneas y cotas">
          <div className="flex flex-col gap-10">
            <SheetLabel index="04" name="Proyectos" />
            <Rule />
            <Dimension>12,40 m</Dimension>
            <div className="theme-grafito flex flex-col gap-8 p-10">
              <SheetLabel index="01" name="Inicio" />
              <Dimension>L—01</Dimension>
            </div>
          </div>
        </Block>

        <Block index="S7" name="Grilla">
          <div className="theme-grafito relative py-16">
            <GridLines className="opacity-50" />
            <Grid className="relative gap-y-4">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="label hidden lg:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
              <p className="col-span-4 text-lead lg:col-span-5 lg:col-start-2">
                12 columnas en desktop, 4 en móvil. Margen y medianera iguales.
              </p>
            </Grid>
          </div>
        </Block>

        <Block index="S8" name="Visor antes / después">
          <BeforeAfter label="Fachada (demo)" before={comparison.before} after={comparison.after} />
          <Label muted>Variante plano / foto</Label>
          <BeforeAfter
            label="Planta y obra (demo)"
            labels={{ before: 'Plano', after: 'Obra' }}
            initial={35}
            intro={false}
            tone="blanco"
            before={comparison.before}
            after={comparison.after}
          />
        </Block>
      </Container>
    </div>
  )
}
