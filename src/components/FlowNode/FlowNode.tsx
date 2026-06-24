import { Icon } from '../Icon'
import './FlowNode.css'

export interface FlowNodeProps {
  title: string
  /** Подпись (uppercase). */
  subtitle?: string
  /** Показывать точки-коннекторы внизу. */
  connectors?: boolean
}

/**
 * FlowNode — карточка-нода автоматизации (play + заголовок + точки-коннекторы).
 * Источник правды: Figma → ds-molecules → `node` (node 1:1872, вариант Default 1:1873).
 */
export function FlowNode({ title, subtitle, connectors = true }: FlowNodeProps) {
  return (
    <div className="ds-flownode">
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
