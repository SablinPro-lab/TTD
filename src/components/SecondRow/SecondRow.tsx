import type { ReactNode } from 'react'
import { Button } from '../Button'
import './SecondRow.css'

export interface SecondRowProps {
  /** Показать кнопку «Back». */
  onBack?: () => void
  /** Хлебные крошки. */
  breadcrumbs?: string[]
  /** Действия справа (например, Save / Deploy) — вариант `builider`. */
  actions?: ReactNode
}

/**
 * SecondRow — вторичный тулбар: Back + хлебные крошки + действия справа.
 * Источник правды: Figma → ds-organisms → `second_row` (node 1:1985).
 * Default: Back (white pill, green border) + крошки «Home • Something • Something».
 * builider: Back слева + действия справа (SPACE_BETWEEN).
 */
export function SecondRow({ onBack, breadcrumbs = [], actions }: SecondRowProps) {
  const hasActions = !!actions
  return (
    <div className={`ds-second-row ${hasActions ? 'ds-second-row--builder' : ''}`}>
      <div className="ds-second-row__lead">
        {onBack && (
          <Button variant="secondary" className="ds-second-row__back" onClick={onBack} aria-label="Назад">
            <svg className="ds-second-row__back-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </Button>
        )}
        {breadcrumbs.length > 0 && (
          <nav className="ds-second-row__crumbs">
            {breadcrumbs.map((c, i) => (
              <span key={i} className="ds-second-row__crumb">
                {i > 0 && <span className="ds-second-row__sep" aria-hidden="true">•</span>}
                {c}
              </span>
            ))}
          </nav>
        )}
      </div>
      {hasActions && <span className="ds-second-row__actions">{actions}</span>}
    </div>
  )
}

export default SecondRow
