import './Graph.css'

export interface GraphProps {
  /** Высоты столбцов в процентах 0–100. Figma: `graph` — скруглённые чёрные блоки. */
  values?: number[]
  /** Высота области графика, px. */
  height?: number
}

/**
 * Graph — простой блочный график (скруглённые чёрные столбцы).
 * Источник правды: Figma → ds-atoms → `graph` (node 1:1829).
 */
export function Graph({ values = [100, 60], height = 96 }: GraphProps) {
  return (
    <div className="ds-graph" style={{ height }}>
      {values.map((v, i) => (
        <div
          key={i}
          className="ds-graph__bar"
          style={{ height: `${Math.max(0, Math.min(100, v))}%` }}
        />
      ))}
    </div>
  )
}

export default Graph
