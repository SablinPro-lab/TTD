import type { CSSProperties } from 'react'
import { Icon } from '../Icon'
import './FlowNode.css'

export type FlowNodeColor = 'red' | 'pink' | 'lavender' | 'olive' | 'peach' | 'green'

export interface FlowNodeProps {
  title: string
  /** Подпись (uppercase). */
  subtitle?: string
  /** Показывать точки-коннекторы внизу. */
  connectors?: boolean
  /** Цвет подложки ноды (Figma: разные узлы — разные пастели). По умолч. red. */
  color?: FlowNodeColor
}

/**
 * FlowNode — карточка-нода автоматизации (play + заголовок + точки-коннекторы).
 * Источник правды: Figma → ds-molecules → `node` (node 1:1872, вариант Default 1:1873).
 */
export function FlowNode({ title, subtitle, connectors = true, color }: FlowNodeProps) {
  const style = color ? ({ background: `var(--ds-color-card-${color})` } as CSSProperties) : undefined
  return (
    <div className="ds-flownode" style={style}>
      <div className="ds-flownode__body">
        <div className="ds-flownode__head">
          <Icon name="play" size={16} />
          <Icon name="more" size={16} />
        </div>
        <div className="ds-flownode__text">
          <span className="ds-flownode__title">{title}</span>
          {subtitle && <span className="ds-flownode__subtitle">{subtitle}</span>}
        </div>
      </div>
      {connectors && (
        <div className="ds-flownode__dots">
          <span className="ds-flownode__dot ds-flownode__dot--l" />
          <span className="ds-flownode__dot ds-flownode__dot--r" />
        </div>
      )}
    </div>
  )
}

export default FlowNode
