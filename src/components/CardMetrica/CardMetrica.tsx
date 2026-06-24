import type { ReactNode } from 'react'
import './CardMetrica.css'

export interface CardMetricaProps {
  title: string
  /** Крупное значение метрики. */
  value: ReactNode
  /** Подпись под значением (uppercase), напр. «Total received». */
  caption?: string
}

/**
 * CardMetrica — карточка с заголовком и крупным числовым значением + подписью.
 * Источник правды: Figma → ds-molecules → `card_metrica` (node 1:1942, вариант 1:1943).
 */
export function CardMetrica({ title, value, caption }: CardMetricaProps) {
  return (
    <div className="ds-card-metrica">
      <span className="ds-card-metrica__title">{title}</span>
      <div className="ds-card-metrica__block">
        <span className="ds-card-metrica__value">{value}</span>
        {caption && <span className="ds-card-metrica__caption">{caption}</span>}
      </div>
    </div>
  )
}

export default CardMetrica
