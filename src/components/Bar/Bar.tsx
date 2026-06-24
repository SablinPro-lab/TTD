import type { CSSProperties } from 'react'
import './Bar.css'

export type BarSize = 'default' | 'big'
export type BarTone = 'default' | 'green'

export interface BarProps {
  /** Заполнение в процентах 0–100. Figma: `length=75% | 20%`. */
  value?: number
  /** Толщина. Figma: `Property 1=Default | big` (big = две строки точек). */
  size?: BarSize
  /** Палитра точек. default — sage (#b8c6c3); green — tech-green (#00867b) + бледный card-green (#d4eee7). */
  tone?: BarTone
}

/**
 * Bar — точечный индикатор заполнения. Один слой: цвет (linear-gradient «заполнение / хвост»)
 * раскраивается dot-маской с `mask-repeat: space` — точки ВСЕГДА целые, ничего не обрезается по
 * краям контейнера. `big` = две ровные строки точек. Цвета строго из палитры (tone).
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `bar` (node 1:120).
 */
export function Bar({ value = 75, size = 'default', tone = 'default' }: BarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const style = { '--ds-bar-pct': `${clamped}%` } as CSSProperties
  return (
    <div
      className={`ds-bar ds-bar--${size} ds-bar--tone-${tone}`}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

export default Bar
