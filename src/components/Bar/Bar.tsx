import './Bar.css'

export type BarSize = 'default' | 'big'
export type BarTone = 'default' | 'green'

export interface BarProps {
  /** Заполнение в процентах 0–100. Figma: `length=75% | 20%`. */
  value?: number
  /** Толщина. Figma: `Property 1=Default | big` (big = две строки точек). */
  size?: BarSize
  /** Палитра точек. default — sage (#b8c6c3)/empty; green — насыщ. tech-green (#00867b) + бледный card-green (#d4eee7). */
  tone?: BarTone
}

/**
 * Bar — точечный индикатор заполнения (прогресс): заполненная часть — насыщенные точки,
 * хвост — бледные. `big` = две строки точек.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `bar` (node 1:120).
 * Цвета строго из палитры; productivity/progress на страницах — `tone="green"` (Figma team bar).
 */
export function Bar({ value = 75, size = 'default', tone = 'default' }: BarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`ds-bar ds-bar--${size} ds-bar--tone-${tone}`} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="ds-bar__fill" style={{ width: `${clamped}%` }} />
    </div>
  )
}

export default Bar
