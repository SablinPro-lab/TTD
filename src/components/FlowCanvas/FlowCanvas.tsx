import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { FlowNode } from '../FlowNode'
import type { FlowNodeColor } from '../FlowNode'
import './FlowCanvas.css'

export interface FlowCanvasNode {
  id: string
  title: string
  subtitle?: string
  color?: FlowNodeColor
  /** Начальная позиция на канве, px (top-left ноды). */
  x: number
  y: number
}
export interface FlowCanvasEdge {
  /** id ноды-источника (выходной порт, чёрный) → id ноды-приёмника (входной порт, серый). */
  from: string
  to: string
}

export interface FlowCanvasProps {
  nodes: FlowCanvasNode[]
  edges?: FlowCanvasEdge[]
  /** Выбор ноды (клик/начало перетаскивания) — напр. для панели свойств. */
  onSelect?: (id: string) => void
}

/* Геометрия ноды (Figma node 1:4254): 280×115, точки-порты в нижнем ряду
   (pad 14 + body 53 + gap 24 + half-dot 5 = 96 по Y; центры точек 19 / 261 по X). */
const NODE_W = 280
const PORT_Y = 96
const PORT_X_IN = 19
const PORT_X_OUT = NODE_W - 19

type Drag =
  | { kind: 'node'; id: string; dx: number; dy: number }
  | { kind: 'wire'; from: string; x: number; y: number }
  | null

/** Кубическая кривая «нитки» с горизонтальными контрол-точками (плавная S-кривая). */
function wirePath(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

/**
 * FlowCanvas — канва автоматизаций: ноды (FlowNode) можно ПЕРЕТАСКИВАТЬ, а порты —
 * СОЕДИНЯТЬ «нитками» (drag от чёрного выходного порта к серому входному другой ноды).
 * Оптимизация: pointer-события на window + троттлинг через requestAnimationFrame; перетаскивание
 * через CSS transform (translate). Источник правды: Figma → ds-organisms (canvas 1:4253, node 1:4254).
 */
export function FlowCanvas({ nodes, edges: initialEdges = [], onSelect }: FlowCanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }])),
  )
  const [edges, setEdges] = useState<FlowCanvasEdge[]>(initialEdges)
  const [drag, setDrag] = useState<Drag>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const hoverInput = useRef<string | null>(null)
  const dragRef = useRef<Drag>(null)
  dragRef.current = drag

  const toCanvas = useCallback((clientX: number, clientY: number) => {
    const r = rootRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }, [])

  // перетаскивание/соединение — слушатели на window, троттлинг через rAF
  useEffect(() => {
    if (!drag) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const d = dragRef.current
        if (!d) return
        const p = toCanvas(e.clientX, e.clientY)
        if (d.kind === 'node') setPos((s) => ({ ...s, [d.id]: { x: p.x - d.dx, y: p.y - d.dy } }))
        else setDrag({ ...d, x: p.x, y: p.y })
      })
    }
    const onUp = () => {
      const d = dragRef.current
      if (d?.kind === 'wire' && hoverInput.current && hoverInput.current !== d.from) {
        const to = hoverInput.current
        setEdges((es) => (es.some((e) => e.from === d.from && e.to === to) ? es : [...es, { from: d.from, to }]))
      }
      hoverInput.current = null
      if (raf) cancelAnimationFrame(raf)
      setDrag(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [drag, toCanvas])

  const startNodeDrag = (e: ReactPointerEvent, id: string) => {
    e.preventDefault()
    const p = toCanvas(e.clientX, e.clientY)
    setSelected(id)
    onSelect?.(id)
    setDrag({ kind: 'node', id, dx: p.x - pos[id].x, dy: p.y - pos[id].y })
  }
  const startWire = (e: ReactPointerEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    setDrag({ kind: 'wire', from: id, x: pos[id].x + PORT_X_OUT, y: pos[id].y + PORT_Y })
  }

  const out = (id: string) => ({ x: pos[id].x + PORT_X_OUT, y: pos[id].y + PORT_Y })
  const inp = (id: string) => ({ x: pos[id].x + PORT_X_IN, y: pos[id].y + PORT_Y })

  return (
    <div className="ds-flow-canvas" ref={rootRef}>
      <svg className="ds-flow-canvas__wires" aria-hidden="true">
        {edges.map((e, i) => {
          if (!pos[e.from] || !pos[e.to]) return null
          const a = out(e.from)
          const b = inp(e.to)
          return <path key={`${e.from}-${e.to}-${i}`} className="ds-flow-canvas__wire" d={wirePath(a.x, a.y, b.x, b.y)} />
        })}
        {drag?.kind === 'wire' && (
          <path
            className="ds-flow-canvas__wire ds-flow-canvas__wire--live"
            d={wirePath(out(drag.from).x, out(drag.from).y, drag.x, drag.y)}
          />
        )}
      </svg>

      {nodes.map((n) => {
        const p = pos[n.id]
        const isDragging = drag?.kind === 'node' && drag.id === n.id
        return (
          <div
            key={n.id}
            className={`ds-flow-canvas__node${selected === n.id ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}`}
            style={{ transform: `translate(${p.x}px, ${p.y}px)`, width: NODE_W }}
            onPointerDown={(e) => startNodeDrag(e, n.id)}
          >
            <FlowNode title={n.title} subtitle={n.subtitle} color={n.color} />
            {/* входной порт (серый, слева) — приёмник нитки */}
            <span
              className="ds-flow-canvas__port ds-flow-canvas__port--in"
              onPointerEnter={() => {
                hoverInput.current = n.id
              }}
              onPointerLeave={() => {
                if (hoverInput.current === n.id) hoverInput.current = null
              }}
              aria-hidden="true"
            />
            {/* выходной порт (чёрный, справа) — тянем нитку отсюда */}
            <span
              className="ds-flow-canvas__port ds-flow-canvas__port--out"
              onPointerDown={(e) => startWire(e, n.id)}
              aria-hidden="true"
            />
          </div>
        )
      })}
    </div>
  )
}

export default FlowCanvas
