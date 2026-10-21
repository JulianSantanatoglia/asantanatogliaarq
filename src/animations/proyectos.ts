import { DESKTOP_MOTION, gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Desktop: la sección se fija y las obras pasan en horizontal con el scroll (scrub, sin snap),
 * con un parallax interno de la foto de ±4 %. Móvil y reduced motion: scroll nativo con snap (CSS).
 */
export function proyectosGallery(root: HTMLElement) {
  const mm = gsap.matchMedia()

  mm.add(DESKTOP_MOTION, () => {
    const pin = root.querySelector<HTMLElement>('[data-gallery-pin]')
    const track = root.querySelector<HTMLElement>('[data-track]')
    if (!pin || !track) return

    root.classList.add('is-pinned')
    const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    track.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })

    // Con teclado: al enfocar una card fuera de cuadro, el scroll la trae (el track está transformado).
    const onFocus = (e: FocusEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('[data-card]')
      const st = tween.scrollTrigger
      if (!card || !st) return
      const ratio = Math.min(1, Math.max(0, (card.offsetLeft - 40) / (distance() || 1)))
      window.scrollTo({ top: st.start + ratio * (st.end - st.start) })
    }
    track.addEventListener('focusin', onFocus)
    ScrollTrigger.refresh()

    return () => {
      track.removeEventListener('focusin', onFocus)
      root.classList.remove('is-pinned')
    }
  })
}
