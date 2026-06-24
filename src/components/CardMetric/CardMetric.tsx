import './CardMetric.css'

export type CardMetricColor = 'green' | 'red' | 'pink' | 'lavender' | 'olive' | 'peach'

export interface CardMetricProps {
  title: string
  /** Подпись внизу (uppercase), напр. «Overall: good». */
  caption?: string
  /** Заполнение капсульного индикатора 0–100. */
  progress?: number
  /** Цвет подложки карточки (Figma: разные метрики — разные пастели). По умолч. green. */
  color?: CardMetricColor
}

/**
 * CardMetric — карточка-метрика: пастельный фон + заголовок + горизонтальный капсульный
 * индикатор (progress-pill) + подпись-итог снизу. Цвета строго из палитры.
 * Источник правды: Figma → ds-molecules → `card metric` (node 1:1936).
 */
export function CardMetric({ title, caption, progress = 72, color = 'green' }: CardMetricProps) {
  const clamped = Math.max(0, Math.min(100, progress))
  return (
    <div className="ds-card-metric" style={{ background: `var(--ds-color-card-${color})` }}>
      <span className="ds-card-metric__title">{title}</span>
      <div className="ds-card-metric__block">
        <div className="ds-card-metric__pill" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
          <div className="ds-card-metric__pill-fill" style={{ width: `${clamped}%` }} />
        </div>
        {caption && <span className="ds-card-metric__caption">{caption}</span>}
      </div>
    </div>
  )
}

export default CardMetric
