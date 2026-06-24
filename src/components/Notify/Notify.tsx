import type { ReactNode } from 'react'
import './Notify.css'

export interface NotifyProps {
  children?: ReactNode
  /** Действие под текстом (Figma: белая pill «More info»). */
  action?: ReactNode
}

/**
 * Notify — уведомление (зелёная плашка): крупный pixel-текст UPPER + опц. действие-кнопка.
 * Источник правды: Figma → ds-molecules → `notify` (node 1:1980, вариант Default 1:1981).
 */
export function Notify({ children, action }: NotifyProps) {
  return (
    <div className="ds-notify" role="status">
      <span className="ds-notify__text">{children}</span>
      {action && <span className="ds-notify__action">{action}</span>}
    </div>
  )
}

export default Notify
