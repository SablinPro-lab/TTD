import './ExperiencePreview.css'

export interface ExperiencePreviewProps {
  /** Период (uppercase), напр. «Jan 2022 — present (3 years)». */
  period: string
  role: string
  company?: string
  description?: string
}

/**
 * ExperiencePreview — блок опыта: период + должность + компания + описание.
 * Источник правды: Figma → ds-molecules → `experience_preview` (node 1:1912, вариант 1:1913).
 */
export function ExperiencePreview({ period, role, company, description }: ExperiencePreviewProps) {
  return (
    <div className="ds-exp">
      <span className="ds-exp__period">{period}</span>
      <div className="ds-exp__main">
        <span className="ds-exp__role">{role}</span>
        {(company || description) && (
          <div className="ds-exp__sub">
            {company && <span className="ds-exp__company">{company}</span>}
            {description && <p className="ds-exp__desc">{description}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperiencePreview
