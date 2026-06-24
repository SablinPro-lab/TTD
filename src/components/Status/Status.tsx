import type { ReactNode } from 'react'
import './Status.css'

export type StatusVariant = 'purple' | 'green' | 'red' | 'stopped'

export interface StatusProps {
  /** Цвет-семантика. Figma: `Property 1=purple|green|red|stopped`. */
  variant?: StatusVariant
  /** Подпись статуса (uppercase). */
  children: ReactNode
}

/**
 * Status — индикатор состояния: цветная точка + uppercase-подпись.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `status` (node 1:1734).
 */
export function Status({ variant = 'green', children }: StatusProps) {
  return (
    <span className={`ds-status ds-status--${variant}`}>
      <span className="ds-status__dot" />
      <span className="ds-status__label">{children}</span>
    </span>
  )
}

export default Status
