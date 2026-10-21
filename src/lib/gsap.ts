import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Desktop con movimiento: el único contexto con pin y scroll horizontal. */
export const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, useGSAP }
