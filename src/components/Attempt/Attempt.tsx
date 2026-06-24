import { Status } from '../Status'
import type { StatusVariant } from '../Status'
import './Attempt.css'

export interface AttemptOffer {
  /** Подпись блока (uppercase), напр. «First attempt». */
  label: string
  /** Сумма/значение, напр. «$8 750» или «$?». */
  amount: string
  /** Перки/условия (uppercase-список). */
  perks?: string[]
  align?: 'left' | 'right'
}

export interface AttemptProps {
  offers: AttemptOffer[]
  /** Итоговый статус по центру, напр. FAILED. */
  status?: { variant: StatusVariant; label: string }
}

/**
 * Attempt — сравнение офферов/попыток переговоров (суммы + перки + статус по центру).
 * Источник правды: Figma → ds-molecules → `attempt` (node 1:1948; Default 1:1949, Variant2 1:1965).
 * Раскладка: верхний лейбл попытки + ряд [левый оффер | статус | правый оффер].
 */
export function Attempt({ offers, status }: AttemptProps) {
  const attemptLabel = offers[0]?.label
  return (
    <div className="ds-attempt">
      {attemptLabel && <span className="ds-attempt__label">{attemptLabel}</span>}
      <div className="ds-attempt__row">
        {offers.map((o, i) => (
          <div key={i} className={`ds-attempt__offer ds-attempt__offer--${o.align ?? 'left'}`}>
            <span className="ds-attempt__amount">{o.amount}</span>
            {o.perks && o.perks.length > 0 && (
              <span className="ds-attempt__perks">
                {o.perks.map((p, j) => (
                  <span key={j} className="ds-attempt__perk">{p}</span>
                ))}
              </span>
            )}
          </div>
        ))}
        {status && (
          <div className="ds-attempt__status">
            <Status variant={status.variant}>{status.label}</Status>
          </div>
        )}
      </div>
    </div>
  )
}

export default Attempt
