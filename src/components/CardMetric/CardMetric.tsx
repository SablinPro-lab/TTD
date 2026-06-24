import { Graph } from '../Graph'
import './CardMetric.css'

export type CardMetricColor = 'green' | 'red' | 'pink' | 'lavender' | 'olive' | 'peach'

export interface CardMetricProps {
  title: string
  /** Подпись внизу (uppercase), напр. «Overall: good». */
  caption?: string
  /** Высоты столбцов графика 0–100 (Figma: `graph` — 2 блока). */
  values?: number[]
  /** Цвет подложки карточки (Figma: разные метрики — разные пастели). По умолч. green. */
  color?: CardMetricColor
}

/**
 * CardMetric — карточка-метрика: пастельный фон + заголовок + блочный график (компонент `Graph`)
 * + подпись-итог снизу. Структура и нейминг строго по Figma → ds-molecules → `card metric`
 * (node 1:1936): `graph` = переиспользуемый компонент Graph (в карточке столбцы перекрашены в bg-base).
 */
export function CardMetric({ title, caption, values = [100, 59], color = 'green' }: CardMetricProps) {
  return (
    <div className="ds-card-metric" style={{ background: `var(--ds-color-card-${color})` }}>
      <span className="ds-card-metric__title">{title}</span>
      <div className="ds-card-metric__block">
        <Graph values={values} />
        {caption && <span className="ds-card-metric__caption">{caption}</span>}
      </div>
    </div>
  )
}

export default CardMetric
