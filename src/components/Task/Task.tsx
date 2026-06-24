import type { ReactNode } from 'react'
import { Flag } from '../Flag'
import { ErrorBanner } from '../ErrorBanner'
import './Task.css'

export interface TaskProps {
  title: string
  /** Отмечена флажком — Figma `Variant2`: чёрный заполненный флаг + чёрный заголовок. */
  flagged?: boolean
  /** Текст ошибки (если есть). */
  error?: string
  /** Действие (например, кнопка). */
  action?: ReactNode
}

/**
 * Task — карточка задачи: флаг + заголовок + ошибка + действие.
 * Источник правды: Figma → ds-organisms → `task` (node 1:3731). Композирует Flag, ErrorBanner.
 * Default (не flagged): outline-флаг и заголовок серые (#979797). Variant2 (flagged): чёрные.
 */
export function Task({ title, flagged = false, error, action }: TaskProps) {
  return (
    <div className={`ds-task ${flagged ? 'is-flagged' : ''}`}>
      <Flag active={flagged} size={20} />
      <div className="ds-task__body">
        <span className="ds-task__title">{title}</span>
        {error && <ErrorBanner>{error}</ErrorBanner>}
        {action && <div className="ds-task__action">{action}</div>}
      </div>
    </div>
  )
}

export default Task
