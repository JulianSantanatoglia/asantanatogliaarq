import type { ImgHTMLAttributes } from 'react'
import type { ImageAsset } from '../../content/projects'

type PictureProps = {
  image: ImageAsset
  sizes?: string
  priority?: boolean
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt' | 'width' | 'height'>

/** <picture> con AVIF + WebP y dimensiones declaradas (CLS 0). Lazy salvo `priority`. */
export function Picture({ image, sizes, priority = false, ...img }: PictureProps) {
  const s = sizes ?? image.sizes
  return (
    <picture>
      {image.sources?.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={s} />
      ))}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={s}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        {...img}
      />
    </picture>
  )
}
