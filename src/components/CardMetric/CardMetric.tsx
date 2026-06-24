import './CardMetric.css'

export interface CardMetricProps {
  title: string
  /** Подпись внизу (uppercase), напр. «Overall: good». */
  caption?: string
  /** Высоты столбцов мини-графика (0–100). */
  values?: number[]
}

/**
 * CardMetric — карточка-метрика (Health): зелёный фон + заголовок + мини-график + подпись-итог.
 * Источник правды: Figma → ds-molecules → `card metric` (node 1:1936).
 */
export function CardMetric({ title, caption, values = [100, 55] }: CardMetricProps) {
  return (
    <div className="ds-card-metric">
      <span className="ds-card-metric__title">{title}</span>
      <div className="ds-card-metric__block">
        <div className="ds-card-metric__graph" aria-hidden="true">
          {values.map((v, i) => (
            <span key={i} style={{ height: `${Math.max(0, Math.min(100, v))}%` }} />
          ))}
        </div>
        {caption && <span className="ds-card-metric__caption">{caption}</span>}
      </div>
    </div>
  )
}

export default CardMetric
