import './Bar.css'

export type BarSize = 'default' | 'big'

export interface BarProps {
  /** Заполнение в процентах 0–100. Figma: `length=75% | 20%`. */
  value?: number
  /** Толщина. Figma: `Property 1=Default | big`. */
  size?: BarSize
}

/**
 * Bar — дашевый индикатор заполнения (прогресс).
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `bar` (node 1:120).
 */
export function Bar({ value = 75, size = 'default' }: BarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`ds-bar ds-bar--${size}`} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="ds-bar__fill" style={{ width: `${clamped}%` }} />
    </div>
  )
}

export default Bar
