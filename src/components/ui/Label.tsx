import type { ElementType, ReactNode } from 'react'

type LabelProps = {
  as?: ElementType
  muted?: boolean
  className?: string
  children: ReactNode
}

/** Mayúsculas con tracking amplio, como el ARQUITECTO del logo. */
export function Label({ as: Tag = 'span', muted = false, className = '', children }: LabelProps) {
  return (
    <Tag className={`label ${muted ? 'text-(--theme-muted)' : ''} ${className}`}>{children}</Tag>
  )
}

type SheetLabelProps = {
  index: string
  name: string
  className?: string
}

/** Rótulo de lámina, al estilo de un plano: L—01 · PROYECTOS. */
export function SheetLabel({ index, name, className = '' }: SheetLabelProps) {
  return (
    <Label className={`inline-flex items-center gap-[0.9em] ${className}`}>
      <span>L—{index}</span>
      <span aria-hidden="true" className="inline-block h-px w-[2.5em] bg-current" />
      <span>{name}</span>
    </Label>
  )
}
