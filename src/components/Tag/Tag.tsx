import type { ReactNode } from 'react'
import './Tag.css'

export type TagVariant = 'control' | 'static'

export interface TagProps {
  /** control — интерактивный чип, static — просто метка. Figma: `Property 1=control|static`. */
  variant?: TagVariant
  children: ReactNode
  onClick?: () => void
}

/**
 * Tag — компактный чип с uppercase-текстом.
 * Источник правды: Figma → ds-atoms → `tag` (node 1:1772).
 */
export function Tag({ variant = 'static', children, onClick }: TagProps) {
  if (variant === 'control') {
    return (
      <button type="button" className="ds-tag ds-tag--control" onClick={onClick}>
        <span className="ds-tag__label">{children}</span>
        {/* Figma control: иконка-«крестик» (SF 􀁎) для удаления чипа */}
        <svg className="ds-tag__icon" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="7" />
          <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
        </svg>
      </button>
    )
  }
  return <span className="ds-tag ds-tag--static">{children}</span>
}

export default Tag
