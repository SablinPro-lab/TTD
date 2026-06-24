import type { ReactNode } from 'react'
import './ErrorBanner.css'

export interface ErrorBannerProps {
  /** Префикс-метка. */
  label?: string
  /** Текст ошибки. */
  children: ReactNode
}

/**
 * ErrorBanner — строка ошибки (красный текст на белой плашке).
 * Источник правды: Figma → ds-atoms → `error` (node 1:1778).
 */
export function ErrorBanner({ label = 'Error!', children }: ErrorBannerProps) {
  return (
    <div className="ds-error" role="alert">
      <span className="ds-error__label">{label}</span>
      <span className="ds-error__msg">{children}</span>
    </div>
  )
}

export default ErrorBanner
