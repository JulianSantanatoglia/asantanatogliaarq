# Web nueva: Alejandro E. Santanatoglia · Arquitecto

> **Cómo usar este documento:** pegalo en un proyecto vacío junto con la carpeta `brand/` (manual de marca, logos y fuentes) y las fotos que tengas. Es un brief completo: contexto, reglas de marca, concepto, mapa de secciones, especificación del visor antes/después, stack y proceso.

---

Sos director creativo y desarrollador front-end senior. Vas a crear desde cero la web de **Alejandro E. Santanatoglia, arquitecto**. No queremos una landing informativa: queremos una **experiencia digital**, un recorrido que se vive al hacer scroll y que se recuerda después de cerrar la pestaña. Tiene que sentirse premium, moderna y precisa, pero creíble y usable. Ningún efecto se pone porque sí: cada uno tiene que tener una razón de ser.

El nivel de experiencia de referencia es **jsagency.es**: ritmo de scroll, narrativa por secciones, revelados de texto y cuidado en el detalle. Tomá de ahí **cómo se siente navegar**, no **cómo se ve**. No copies componentes, layouts, paleta ni etiquetas de esa web. Esta web habla el idioma de la arquitectura: planos, cotas, líneas, materia y luz.

---

## 1. Contexto del cliente

- **Quién es:** Alejandro E. Santanatoglia, arquitecto en Argentina. Hace proyecto, dirección y construcción, y remodelaciones integrales.
- **Situación actual:** su única presencia online es Instagram. No hay web anterior, así que no hay SEO ni URLs que conservar.
- **Objetivo:** que alguien que lo busca en Google entienda en segundos **qué hace, cómo trabaja y qué resultados logra**, vea proyectos reales y lo contacte (formulario o WhatsApp).
- **Público:** particulares que van a construir o remodelar su casa (por ejemplo, casas de veraneo en la costa, como Cariló) y que necesitan confiar en alguien antes de invertir mucho dinero.
- **Idioma:** español rioplatense con voseo ("contanos tu proyecto", "escribinos"). El tono es sereno, claro y técnico sin ser frío. Nada de jerga de marketing.
- **Alcance contratado:** hasta 5 secciones (Inicio, Proyectos, Servicios, Sobre el estudio y Contacto), 1 formulario, botón de WhatsApp, SEO técnico, GA4 y páginas legales. Si algo no entra en este alcance, avisame en vez de construirlo.

### Material de referencia que ya existe (pieza "Casa Cariló")

- La lámina tiene: monograma "A" en arena sobre grafito, la tríada **DISEÑAR · CONSTRUIR · HABITAR** (con "CONSTRUIR" en peso fuerte), plantas de arquitectura en línea negra sobre blanco, un fondo de textura de revoque/hormigón y un **ANTES / DESPUÉS** de la misma casa con pileta.
- El texto del proyecto es: *"Proyecto de remodelación, reordenamiento funcional y creación de nuevos espacios."*
- Ese es el ADN visual de la web: **plano → obra → casa habitada.**

---

## 2. Manual de marca: reglas que no se negocian

El archivo `brand/manual_alejandro.pdf` manda. Si algo de este documento contradice al manual, gana el manual: avisame del conflicto.

### Filosofía (texto real del manual, usalo como fuente de copy)

> La arquitectura nace del equilibrio entre la razón y la sensibilidad.
> Cada proyecto es un sistema donde la técnica, la función y la experiencia se entrelazan para dar forma a espacios pensados en profundidad. La luz, el recorrido, las proporciones y el vínculo con la naturaleza no son variables, sino el punto de partida.
> Diseñar es observar, escuchar y traducir: entender cómo se habita un espacio para construirlo con precisión y sentido.
> Nada es casual. Cada línea, cada encuentro y cada decisión responden a una lógica clara, donde la idea y la materia se encuentran en una misma dirección.
> Una arquitectura que busca permanencia, coherencia y belleza en lo esencial.

### Logotipo

- Es un **monograma "A" pensado como estructura**. El **trazo horizontal** es la base y el nivel (obra, implantación, sistema). Las **diagonales** aportan dirección y tensión (resolución estructural, proceso, decisiones de obra).
- Lockup completo: monograma + "ALEJANDRO E. / SANTANATOGLIA" + línea + "ARQUITECTO" con tracking muy abierto.
- Versiones permitidas: lockup completo, **versión solo tipográfica** (nombre + línea + ARQUITECTO, sin monograma) y el monograma como identificador cuando se usa por separado. Se puede aplicar en los colores institucionales.
- **Área de resguardo:** respetala tal como la define la página 6 del manual. Pasala a un token (`--logo-clearspace`) y no dejes que ningún elemento invada ese margen, tampoco en el header sticky.
- **No redibujes, deformes, rotes ni recolorees el logo fuera de la paleta.** Usá el SVG original. Si no está en `brand/`, frená y pedímelo: no lo vectorices "a ojo" para producción.
- Para animarlo (ver hero) separá el SVG en capas (`#a-base`, `#a-diag-1`, `#a-diag-2`, `#wordmark`) sin cambiar la geometría.

### Colores institucionales (los 5 del manual + blanco de soporte)

| Token | HEX | RGB | Uso propuesto |
|---|---|---|---|
| `grafito` | `#45484F` | 69 · 72 · 79 | Color principal de la marca. Fondos de hero, secciones oscuras, bloques de marca |
| `negro` | `#1C1C1C` | 28 · 28 · 28 | Texto principal sobre claro, footer, momentos de máximo contraste |
| `arena` | `#D3CFC6` | 211 · 207 · 198 | Fondo claro principal (papel/piedra), monograma sobre oscuro |
| `topo` | `#837F76` | 131 · 127 · 118 | Gris cálido para bloques de materia, separadores y detalles |
| `gris` | `#8A8B8F` | 138 · 139 · 143 | Líneas finas, cotas, metadatos y texto secundario sobre negro |
| `blanco` | `#FFFFFF` | — | Soporte de plantas y láminas, como en la papelería del manual |

**Contraste WCAG medido; respetá estas combinaciones:**

- Texto de cuerpo (AA ≥ 4.5): negro sobre arena (10.96), arena sobre grafito (5.89), blanco sobre grafito (9.16), gris sobre negro (5.01), negro o grafito sobre blanco.
- Solo texto grande o elementos gráficos (≥ 3): blanco sobre gris (3.40), blanco sobre topo (3.99), topo sobre negro (4.27).
- **Prohibido para texto:** gris o topo sobre arena (2.2–2.6) y gris o topo sobre grafito (2.3–2.7). Solo valen para líneas decorativas.

**Sin degradados.** Solo colores planos, fotografía y, como textura, la **trama de monogramas "A"** del manual (portada y pág. 10: la A repetida tono sobre tono a muy bajo contraste) o un grano o revoque sutil como el del material de Cariló.

### Tipografía

- **Neue Montreal es la única fuente admitida** ("ninguna otra fuente será admitida en su reemplazo"). No sumes una segunda familia, tampoco para titulares ni para mono.
- La jerarquía se construye con **peso** (Regular / Medium / Bold, como en el manual), **tamaño**, **tracking** (mayúsculas espaciadas tipo "ARQUITECTO" para etiquetas) y **mayúsculas/minúsculas**.
- Para cifras y cotas usá `font-variant-numeric: tabular-nums` en lugar de una fuente mono.
- **Licencia:** Neue Montreal es de Pangram Pangram. Es gratis para uso personal, pero para uso comercial en web hace falta la licencia. Autoalojá los `.woff2` licenciados en `public/fonts/` con `font-display: swap` y un *preload* del peso del hero. Si los archivos todavía no están, dejá el `@font-face` apuntando a las rutas esperadas, con fallback `"Helvetica Neue", Arial, sans-serif`, y listalo como pendiente. **No la reemplaces por otra webfont.**

---

## 3. Concepto

Este concepto ya está definido. Antes de implementar, devolveme en 10–15 líneas cómo lo vas a bajar (o los ajustes que proponés, con su motivo). **Esperá mi OK.**

- **Idea central:** *Del trazo a la obra.* La web es un proyecto que se construye mientras bajás: empieza como una línea, se vuelve plano, el plano se vuelve materia y la materia se vuelve casa habitada. **Diseñar → Construir → Habitar.**
- **Personalidad:** precisa, serena y material.
  - **No tiene que ser:** lujosa ni ostentosa (dorados, mármol, "exclusividad"), corporativa y fría, rústica tipo "obra pesada" (cascos, conos), ni tecnológica (neón, 3D, partículas).
- **Paleta:** la del manual, aplicada en **ritmo de láminas**: secciones arena (papel) alternadas con grafito (estructura) y algún bloque topo (materia). Los cambios de fondo entre secciones son parte de la narrativa.
- **Tipografía:** solo Neue Montreal. Titulares grandes en Medium con interlineado apretado. Cuerpo en Regular. Etiquetas en mayúsculas con tracking amplio, como el "ARQUITECTO" del logo. La tríada sigue a la pieza Cariló: "DISEÑAR" y "HABITAR" en Regular, "**CONSTRUIR**" en Bold.
- **Personalidad del movimiento: preciso y sobrio, como un tiralíneas.**
  - Duraciones de 0.8–1.2 s en revelados y 0.25–0.35 s en microinteracciones.
  - Easing principal `cubic-bezier(0.65, 0, 0.35, 1)` (inOut firme) y, para trazos, `cubic-bezier(0.33, 0, 0.2, 1)`.
  - Nada de rebotes, elásticos ni overshoot. Las líneas se dibujan, los planos se deslizan y las imágenes se descubren como si se corriera una lámina.
- **Momento firma: "La línea que transforma"**, el visor antes/después (sección 6). Una sola línea vertical (el gesto más básico del arquitecto) separa lo que había de lo que se construyó. Es lo que el usuario tiene que recordar.
- **Grilla y composición:** grilla de 12 columnas con márgenes generosos. Las líneas de grilla y las **cotas** (líneas de medida con remates) aparecen como recurso gráfico en 1px `gris`. Composición asimétrica, como una lámina de presentación: mucho aire, imagen grande y texto corto.

---

## 4. Reglas visuales

- **Cero redondeo:** `border-radius: 0` en todo (botones, cards, inputs, imágenes, banner de cookies y foco). Máximo 2px solo si algo técnico lo exige.
- **Sin degradados de color**, sin sombras difusas, sin glassmorphism, sin blur de fondo.
- **Botones:** rectangulares y minimalistas, con borde de 1px o fondo plano y texto en mayúsculas con tracking. El hover tiene intención: un **relleno que entra desde la base** (como el trazo horizontal de la A) o una flecha `→` que se desplaza 4–6px. El foco es un contorno cuadrado de 2px `arena` o `negro` según el fondo, con offset.
- **Cards de proyecto:** imagen sin marco, línea de 1px, ficha técnica abajo (Ubicación · Tipo · Año · m²) en etiquetas espaciadas. Mucho aire y jerarquía tipográfica fuerte.
- **Rótulo de lámina:** los encabezados de sección pueden llevar un rótulo técnico chico, al estilo de un plano (`L—01 · PROYECTOS`). Que sea sutil y consistente, nunca un `// 01` de código.
- **Prohibido:** emojis o íconos genéricos (si hace falta un ícono, que sea de línea fina, cuadrado y hecho a medida), ilustraciones de stock, renders 3D genéricos, partículas, neón, fondos animados y frases vacías ("soluciones innovadoras", "calidad premium", "tu hogar soñado").

---

## 5. Mapa de secciones

La web es **una sola página con anclas** (`/#proyectos`, etc.) más las páginas legales y un 404. Cada sección tiene un objetivo, un contenido y una interacción. **Total: 1 momento firma + 5 interacciones de apoyo.** No sumes más.

| # | Sección | Objetivo | Contenido | Interacción |
|---|---|---|---|---|
| 0 | **Header** | Orientar y dar acceso al contacto | Logo (versión horizontal), anclas, botón "Contacto" | Se esconde al bajar y aparece al subir. Indicador de progreso tipo **regla** (apoyo 5) |
| 1 | **Hero: Diseñar · Construir · Habitar** | Identidad en 3 segundos | Fondo grafito, monograma, nombre, tríada, una línea de propuesta y CTA "Ver proyectos" | **El monograma se dibuja** (apoyo 1) |
| 2 | **Filosofía** | Transmitir cómo piensa | Fragmento editado del manifiesto ("Nada es casual. Cada línea…") | **Texto que se enciende** al leer (apoyo 2) |
| 3 | **Proceso: del plano a la casa** | Explicar el método y bajar la incertidumbre | 3 pasos (Diseñar / Construir / Habitar), cada uno con una frase y una imagen: planta → obra → casa terminada | **Sección fijada** en la que el plano se transforma en foto (apoyo 3) |
| 4 | **Proyectos** | Mostrar trabajo real | Grilla o galería de obras con ficha técnica. Caso destacado: **Casa Cariló** con su texto y su antes/después | **Galería horizontal** en desktop y swipe nativo en móvil (apoyo 4). **Visor antes/después** (momento firma) |
| 5 | **Servicios** | Qué contrata el cliente | Proyecto de arquitectura · Dirección y construcción de obra · Remodelaciones y reordenamiento funcional `[CONFIRMAR]` | Lista con líneas de 1px que se dibujan al entrar. El hover revela una descripción corta |
| 6 | **Sobre el estudio** | Poner cara y respaldo | Foto de Alejandro, bio corta, matrícula profesional, zona de trabajo | Revelado de imagen con máscara (reusa la de apoyo 3) |
| 7 | **Contacto** | Convertir | Frase de cierre ("Hacemos realidad tu sueño", del manual, o alternativa a aprobar), formulario, WhatsApp, email, Instagram, zona | Botones con hover de relleno. Validación clara y accesible |
| 8 | **Footer como rótulo de plano** | Cierre con firma | Bloque tipo rótulo: PROFESIONAL / MATRÍCULA / CONTACTO / LÁMINA 08 de 08, más los links legales | Estático y sobrio |

**Orden narrativo:** el hero es la línea, la filosofía es la idea, el proceso es el plano que se vuelve obra, los proyectos son la obra terminada (y el antes/después es la prueba), y el contacto es tu proyecto.

---

## 6. Momento firma: visor antes/después "La línea que transforma"

Es el componente protagonista. Hacelo con más cuidado que cualquier otra cosa.

### Comportamiento

- Dos imágenes **del mismo encuadre** apiladas (antes abajo, después arriba). Una **línea vertical de 1px** color `arena` (o `blanco` sobre fotos claras) divide la imagen. A la izquierda de la línea se ve el ANTES y a la derecha el DESPUÉS.
- Se arrastra **con mouse, dedo o lápiz** (Pointer Events: `pointerdown` + `setPointerCapture` + `pointermove`). También se puede **hacer click o tocar en cualquier punto** para llevar la línea ahí, con una transición corta.
- **Móvil:** `touch-action: pan-y` en el contenedor, para que el scroll vertical siga funcionando y solo el gesto horizontal mueva la línea. La línea no puede bloquear el scroll de la página.
- **Tirador:** cuadrado de 44×44px de área táctil (visual de ~36px), borde de 1px, fondo grafito, con dos flechas finas `‹ ›`. Sin redondeo. En hover y foco el cuadrado se rellena de `arena`.
- **Etiquetas** "ANTES" y "DESPUÉS" en mayúsculas espaciadas, en las esquinas inferiores. Cada una se desvanece cuando la línea la tapa.
- **Primer contacto (enseñar el gesto):** la primera vez que el visor entra en pantalla, la línea hace un barrido corto y único (50% → 30% → 70% → 50%, ~1.6 s, easing inOut) y queda en el centro. Si el usuario toca antes, se cancela. No se repite.
- **Variante plano/foto:** el mismo componente sirve para `before = planta en línea` y `after = foto de la obra`, por ejemplo en la sección Proceso o en la ficha de Cariló.
- Si hay varios pares por proyecto (living, cocina, fachada…), van en pestañas o miniaturas cuadradas debajo, con transición por opacidad.

### Accesibilidad

- El tirador es `role="slider"` con `aria-label="Comparar antes y después: [nombre del ambiente]"`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow` y `aria-valuetext="40% antes, 60% después"`.
- **Teclado:** ← → mueven 2%, Shift + ← → mueven 10%, Inicio y Fin van a 0 y 100%. El foco es visible y cuadrado.
- Cada imagen tiene un `alt` real y distinto ("Fachada antes de la remodelación: volumen blanco sobre pilotes" / "Fachada después: volumen gris con galería y pileta").
- Con `prefers-reduced-motion` no hay barrido inicial ni transición al tocar: la línea se mueve directo y el componente sigue funcionando.
- Sin JS (o antes de hidratar) se ven las dos imágenes una al lado de la otra (o apiladas en móvil) con sus etiquetas: el contenido no depende del efecto.

### Implementación

- El recorte va con `clip-path: inset(0 0 0 var(--pos))` sobre la imagen DESPUÉS, y la línea con `transform: translateX(...)`. **No se anima `width` ni `left`.**
- La posición vive en un `ref` y se escribe como custom property dentro de `requestAnimationFrame`. **No se usa `setState` en cada `pointermove`**: el componente no tiene que re-renderizar mientras se arrastra.
- Las imágenes llevan `width`/`height` o `aspect-ratio` fijo (CLS = 0) y `srcset` AVIF/WebP. Las dos imágenes del par se cargan juntas para que nunca se vea una sin la otra.
- **API sugerida:**

```tsx
type BeforeAfterProps = {
  before: ImageAsset;          // { src, srcSet?, alt, width, height }
  after: ImageAsset;
  label: string;               // "Living", "Fachada"...
  initial?: number;            // 0–100, default 50
  labels?: { before: string; after: string }; // default "ANTES" / "DESPUÉS"
  intro?: boolean;             // barrido inicial, default true
};
```

- **Tests** (Vitest + Testing Library): teclado (flechas, Shift, Inicio/Fin), límites 0–100 y aria actualizado. Validalo a mano en iOS Safari y Chrome Android: el arrastre horizontal no puede romper el scroll vertical.

---

## 7. Interacciones de apoyo

1. **Hero: el monograma se dibuja.** Primero el **trazo horizontal** (nivel, base: ~0.6 s), después las dos diagonales (~0.8 s, desfasadas) y por último el nombre revelado por líneas desde una máscara. Duración total < 2.2 s. El contenido (texto y CTA) es legible desde el primer frame y nunca espera a que termine la animación. Técnica: `stroke-dasharray`/`stroke-dashoffset` (o DrawSVG de GSAP) sobre las capas del SVG original.
2. **Filosofía: texto que se enciende.** El párrafo arranca en `gris` y cada palabra pasa a `arena` (sobre grafito) a medida que se scrollea (scrub). Es texto real del DOM, partido con SplitText de GSAP o con un split propio, y con el `aria-label` del párrafo completo para que el lector de pantalla no lo lea palabra por palabra.
3. **Proceso: el plano se vuelve casa (pin).** La sección queda fijada durante unos 3 altos de pantalla. A la izquierda los tres pasos (el activo en Bold y el resto en Regular `gris`). A la derecha una imagen que pasa de **planta en línea** a **obra** y de obra a **casa terminada** con revelado por `clip-path` vertical, como una lámina que se corre. Hay una cota de 1px que mide el avance. **En móvil no se fija:** son 3 bloques apilados con revelados simples.
4. **Proyectos: galería horizontal.** En desktop, la sección vertical se fija y las obras pasan en horizontal con el scroll (scrub, sin snap forzado), con un leve parallax interno de la foto (±4%). **En móvil:** carrusel nativo con `scroll-snap-type: x mandatory`, sin JS de scroll. Cada card abre el caso (Cariló) con el visor.
5. **Regla de progreso.** Una regla fina en el header o en el borde lateral, con marcas cada 10 y números chicos, como la regla metálica de la papelería del manual. Avanza con el scroll de la página y marca la sección actual. Es decorativa (`aria-hidden`) y no reemplaza a la navegación.

**Técnica general:** GSAP + ScrollTrigger con `useGSAP` (de `@gsap/react`), con limpieza automática al desmontar. Usá CSS nativo (`animation-timeline: view()`) para los revelados simples si alcanza, con fallback. **Lenis es opcional**: solo entra si mejora la sensación y no rompe anclas, teclado, foco, el formulario ni el visor en móvil. Si dudás, no lo uses.

---

## 8. Stack y estructura del proyecto

- **React + TypeScript (strict) + Vite + Tailwind CSS v4.**
- Animación: `gsap` + `@gsap/react` (con ScrollTrigger y, si los usás, SplitText y DrawSVG). Versiones fijas en `package.json`, sin `^`.
- SEO en una SPA: **prerenderizá el HTML** en el build (por ejemplo con `vite-react-ssg` o un prerender equivalente) para que Google y las previews de redes reciban el contenido real y las metas.
- Formulario: servicio sin backend compatible con hosting gratuito (Web3Forms, Formspree o el form nativo del hosting), con **honeypot + Cloudflare Turnstile** contra spam.
- Hosting gratuito: Cloudflare Pages, Netlify o Vercel.
- Calidad: ESLint + Prettier y Vitest para los componentes con lógica (visor, formulario).

### Estructura

```
src/
  app/            App.tsx, rutas (home, legales, 404)
  sections/       Hero, Filosofia, Proceso, Proyectos, Servicios, Estudio, Contacto, Footer
  components/
    ui/           Button, Link, Label, Rule (línea/cota), Container, Grid
    BeforeAfter/  BeforeAfter.tsx, useDragPosition.ts, BeforeAfter.test.tsx
    brand/        Logo.tsx (SVG en capas), MonogramPattern.tsx, ProgressRuler.tsx
  animations/     un archivo por sección (hero.ts, proceso.ts...) + registry para desactivarlas
  content/        site.ts (datos de contacto, textos), projects.ts, services.ts
  hooks/          useReducedMotion, useIsMobile
  styles/         index.css (Tailwind + tokens), fonts.css
  lib/            analytics.ts (eventos GA4), consent.ts
public/fonts/  public/img/projects/<slug>/  brand/ (manual y logos originales)
```

### Tokens (Tailwind v4, `src/styles/index.css`)

```css
@import "tailwindcss";

@theme {
  --color-*: initial;            /* solo la paleta de marca */
  --color-grafito: #45484F;
  --color-negro:   #1C1C1C;
  --color-arena:   #D3CFC6;
  --color-topo:    #837F76;
  --color-gris:    #8A8B8F;
  --color-blanco:  #FFFFFF;

  --font-sans: "Neue Montreal", "Helvetica Neue", Arial, sans-serif;

  --radius-*: initial;           /* cero redondeo en todo */

  --ease-trazo: cubic-bezier(0.33, 0, 0.2, 1);
  --ease-lamina: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-micro: 300ms;
  --duration-reveal: 1000ms;
}
```

Sumá a los tokens la escala tipográfica fluida (`clamp()`), los espaciados de sección, el tracking de etiquetas (`0.3em`) y `--logo-clearspace`. **Ningún color, duración o easing hardcodeado fuera de los tokens.**

### Contenido tipado (`src/content/projects.ts`)

```ts
export type ImageAsset = { src: string; srcSet?: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;                    // "casa-carilo"
  title: string;                   // "Casa Cariló"
  location: string;                // "Cariló, Buenos Aires"
  type: "Obra nueva" | "Remodelación" | "Ampliación" | "Dirección de obra";
  year?: number;
  area?: string;                   // "180 m²" — solo si el cliente lo da
  summary: string;                 // "Proyecto de remodelación, reordenamiento funcional y creación de nuevos espacios."
  cover: ImageAsset;
  gallery: ImageAsset[];
  plans?: ImageAsset[];            // plantas en línea (SVG o PNG sobre blanco)
  comparisons?: { label: string; before: ImageAsset; after: ImageAsset }[];
  featured?: boolean;
};
```

Todos los textos de la web viven en `src/content/`, no dentro de los componentes, para que editar sea cambiar un dato.

---

## 9. SEO, analítica y legal

- **Metas:** `<title>` del estilo "Alejandro E. Santanatoglia · Arquitecto | Proyecto, obra y remodelaciones en [ZONA]", meta description, canonical, `lang="es-AR"`, Open Graph y Twitter card con una imagen 1200×630 hecha con la marca (grafito + monograma + foto).
- **Datos estructurados (JSON-LD):** `ProfessionalService` (nombre, url, logo, teléfono, `areaServed`, `sameAs` a Instagram) + `Person` (Alejandro, `jobTitle: "Arquitecto"`). Sin dirección exacta si el cliente no quiere publicarla.
- `sitemap.xml`, `robots.txt`, favicon del monograma (SVG + PNG 180/512) y `manifest`.
- Alt texts reales en todas las fotos y un solo `h1` por página.
- **GA4 con Consent Mode v2:** no carga nada hasta que se acepte el banner. Eventos: `click_whatsapp`, `click_phone`, `click_email`, `form_submit`, `before_after_interact` (una vez por sesión y por visor) y `project_open`.
- **Legal (Argentina, Ley 25.326):** banner de cookies (cuadrado, sobrio, con opciones Aceptar / Rechazar en el mismo nivel), `/privacidad` y `/cookies`.

---

## 10. Rendimiento y accesibilidad (criterios de aceptación)

- El contenido se entiende **sin ninguna animación**. Ninguna información vive solo dentro de un efecto.
- **No se secuestra el scroll.** El usuario controla la velocidad. Los pin y el horizontal usan scrub, sin snap forzado.
- Solo se animan `transform`, `opacity` y `clip-path`. **CLS ≈ 0.**
- Imágenes en AVIF/WebP con `srcset`, `loading="lazy"` salvo el hero, `fetchpriority="high"` en la imagen del hero y dimensiones declaradas.
- **`prefers-reduced-motion`:** versión estática y digna. Logo ya dibujado, texto ya encendido, proceso en bloques apilados, galería con scroll nativo y visor sin barrido.
- **Mobile first:** menos pin y nada de horizontal con JS, pero se mantienen la identidad y el visor. Probá en 360px, 768px, 1280px y 1920px.
- **Accesibilidad:** HTML semántico, navegación por teclado completa, *skip link*, foco visible y cuadrado, contraste según la tabla de la sección 2, y targets táctiles ≥ 44px.
- **Lighthouse ≥ 90** en Performance, Accesibilidad, Buenas prácticas y SEO, medido en móvil y en el build de producción.

---

## 11. Proceso de trabajo

1. **Revisión de materiales:** leé `brand/`, listá qué assets hay y cuáles faltan (logo SVG, fuentes, fotos, pares antes/después, plantas). No inventes nada que falte: poné un marcador visible `[PENDIENTE: …]`.
2. **Concepto:** devolveme cómo bajás la sección 3 y **esperá mi aprobación**.
3. **Sistema base:** tokens, fuentes, Logo en capas, Button, Label, Rule/cota, Container/Grid y una página `/_sistema` (solo en dev) donde se vean todos juntos.
4. **Hero + momento firma primero:** el hero con el monograma y el `BeforeAfter` completo, con tests. Mostrámelos antes de seguir.
5. **Resto de secciones** en el orden del mapa, cada una con su animación aislada en `animations/`.
6. **SEO, GA4, consentimiento, formulario y legales.**
7. **QA:** móvil, tablet y desktop, iOS Safari y Chrome Android (sobre todo el visor), teclado, lector de pantalla (VoiceOver o NVDA), reduced motion y Lighthouse.
8. **Resumen final:** qué hiciste, cómo editar contenidos (`src/content/`), qué quedó pendiente y qué te tengo que pasar.

**No hagas commit ni push sin que te lo pida.**

---

## 12. Lo que todavía falta del cliente (no lo inventes)

- [ ] **Logo en SVG** (lockup, versión tipográfica y monograma) y, si existe, la trama de monogramas.
- [ ] **Licencia web de Neue Montreal** y archivos `.woff2` (Regular, Medium, Bold).
- [ ] **Confirmar el nombre público:** el manual dice "Alejandro E. Santanatoglia · Arquitecto" y la propuesta comercial dice "Ale Santanatoglia — Arquitectura y Construcción".
- [ ] **Fotos en alta** de cada obra (mínimo 2400px de lado largo).
- [ ] **Pares antes/después tomados desde el mismo punto y con la misma lente.** Sin esto, el visor no funciona bien. Si hace falta, se re-fotografía el "después" calcando el encuadre del "antes".
- [ ] **Plantas** de los proyectos (PDF, DWG o imagen limpia sobre blanco).
- [ ] Lista de proyectos con ubicación, tipo, año y m² (solo los que quiera publicar).
- [ ] Servicios confirmados y una frase por servicio.
- [ ] Bio, foto profesional y **número de matrícula** (colegio profesional correspondiente).
- [ ] Zona de trabajo, teléfono/WhatsApp, email, Instagram y dominio.
- [ ] Testimonios reales (opcional; si no hay, la sección no existe).
- [ ] Frase de cierre: confirmar "Hacemos realidad tu sueño" (del manual) o una alternativa.
