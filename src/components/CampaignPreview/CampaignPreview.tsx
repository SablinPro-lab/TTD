import type { ReactNode } from 'react'
import { Status } from '../Status'
import type { StatusVariant } from '../Status'
import './CampaignPreview.css'

export interface CampaignMetric {
  value: ReactNode
  label: string
}

export interface CampaignPreviewProps {
  title: string
  status?: { variant: StatusVariant; label: string }
  metrics: CampaignMetric[]
  /** Действие справа (например, кнопка). */
  action?: ReactNode
}

/**
 * CampaignPreview — карточка кампании: заголовок + статус + ряд крупных метрик.
 * Источник правды: Figma → ds-molecules → `campaign_preview` (node 1:1884).
 */
export function CampaignPreview({ title, status, metrics, action }: CampaignPreviewProps) {
  return (
    <div className="ds-campaign">
      <div className="ds-campaign__head">
        <span className="ds-campaign__title">{title}</span>
        <span className="ds-campaign__head-aside">
          {status && <Status variant={status.variant}>{status.label}</Status>}
          {action}
        </span>
      </div>
      <div className="ds-campaign__metrics">
        {metrics.map((m, i) => (
          <span key={i} className="ds-campaign__metric">
            <span className="ds-campaign__value">{m.value}</span>
            <span className="ds-campaign__label">{m.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default CampaignPreview
