import type { ImageAsset } from '../../content/projects'
import { Picture } from './Picture'

type WipeFigureProps = {
  image: ImageAsset
  className?: string
  sizes?: string
}

/**
 * Imagen que se descubre como una lámina que se corre: una línea vertical de 1px
 * barre la imagen (la misma línea del visor antes/después). Ver animations/wipe.ts.
 * Sin animación, la imagen se ve completa y la línea no existe.
 */
export function WipeFigure({ image, className = '', sizes }: WipeFigureProps) {
  return (
    <figure data-wipe="" className={`relative m-0 overflow-hidden bg-topo ${className}`}>
      <Picture image={image} sizes={sizes} className="h-full w-full object-cover" />
      <span data-wipe-line="" aria-hidden="true" className="wipe-line">
        <span />
      </span>
    </figure>
  )
}
