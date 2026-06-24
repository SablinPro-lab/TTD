import './Graph.css'

export interface GraphProps {
  /** Высоты столбцов в процентах 0–100. Figma: `graph` — скруглённые блоки. */
  values?: number[]
  /** Высота области графика, px. Если не задана — берётся из CSS (или flex-контекста контейнера). */
  height?: number
}

/**
 * Graph — простой блочный график (скруглённые столбцы, выровнены по низу).
 * Источник правды: Figma → ds-atoms → `graph` (node 1:1829).
 */
export function Graph({ values = [100, 60], height }: GraphProps) {
  return (
    <div className="ds-graph" style={height != null ? { height } : undefined}>
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
