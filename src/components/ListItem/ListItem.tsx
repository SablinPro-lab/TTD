import type { ReactNode } from 'react'
import './ListItem.css'

export interface ListItemProps {
  /** Заголовок строки (имя/название). */
  title: ReactNode
  /** Мета-колонки (uppercase, приглушённые): тип, автор, дата… */
  meta?: string[]
  /** Действие справа (например, кнопка). */
  action?: ReactNode
}

/**
 * ListItem — строка списка: заголовок + мета-колонки + действие справа.
 * Источник правды: Figma → ds-atoms → `list` (node 1:1787).
 */
export function ListItem({ title, meta = [], action }: ListItemProps) {
  return (
    <div className="ds-list-item">
      <span className="ds-list-item__title">{title}</span>
      <span className="ds-list-item__meta">
        {meta.map((m, i) => (
          <span key={i} className="ds-list-item__meta-cell">{m}</span>
        ))}
      </span>
      {action && <span className="ds-list-item__action">{action}</span>}
    </div>
  )
}

export default ListItem
