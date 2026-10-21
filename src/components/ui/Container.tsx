import type { ElementType, ReactNode } from 'react'

type ContainerProps = {
  as?: ElementType
  className?: string
  children: ReactNode
}

export function Container({ as: Tag = 'div', className = '', children }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-site px-gutter ${className}`}>{children}</Tag>
}
