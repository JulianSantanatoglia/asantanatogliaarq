import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Common = {
  variant?: 'outline' | 'solid'
  /** Muestra la flecha →, que se desplaza en hover. */
  arrow?: boolean
  children: ReactNode
}

type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export function Button(props: AsLink | AsButton) {
  const { variant = 'outline', arrow = false, children, className = '', ...rest } = props
  const cls = `btn ${variant === 'solid' ? 'btn--solid' : ''} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  )

  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
