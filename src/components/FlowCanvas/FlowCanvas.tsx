import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { FlowNode } from '../FlowNode'
import type { FlowNodeColor } from '../FlowNode'
import './FlowCanvas.css'

export interface FlowCanvasNode {
  id: string
  title: string
  subtitle?: string
  color?: FlowNodeColor
  /** Позиция на канве, px (top-left ноды). */
  x: number
  y: number
}
export interface FlowCanvasEdge {
  /** id ноды-источника (выходной порт, чёрный) → id ноды-приёмника (входной порт, серый). */
  from: string
  to: string
}

/** Императивный API канвы: добавить ноду на доску (из библиотеки слева). */
export interface FlowCanvasHandle {
  addNode: (node: Omit<FlowCanvasNode, 'id' | 'x' | 'y'> & Partial<Pick<FlowCanvasNode, 'x' | 'y'>>) => void
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
 * FlowCanvas — канва автоматизаций: ноды (FlowNode) можно ПЕРЕТАСКИВАТЬ, порты — СОЕДИНЯТЬ «нитками»
 * (drag от чёрного выходного к серому входному), ноды — ДОБАВЛЯТЬ (imperative `addNode`, из библиотеки)
 * и УДАЛЯТЬ (кнопка × на ноде). Нитки рисуются ПОВЕРХ карточек (верхний SVG-слой, pointer-events:none).
 * Оптимизация: pointer-события на window + троттлинг rAF; позиционирование через CSS transform.
 * Источник правды: Figma → ds-organisms (canvas 1:4253, node 1:4254).
 */
export const FlowCanvas = forwardRef<FlowCanvasHandle, FlowCanvasProps>(function FlowCanvas(
  { nodes: initialNodes, edges: initialEdges = [], onSelect },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<FlowCanvasNode[]>(initialNodes)
  const [edges, setEdges] = useState<FlowCanvasEdge[]>(initialEdges)
  const [drag, setDrag] = useState<Drag>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const hoverInput = useRef<string | null>(null)
  const dragRef = useRef<Drag>(null)
  dragRef.current = drag
  const seq = useRef(0)

  const toCanvas = useCallback((clientX: number, clientY: number) => {
    const r = rootRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }, [])

  // добавление ноды на доску из библиотеки (каскадом, чтобы не накладывались)
  useImperativeHandle(ref, () => ({
    addNode: (node) => {
      const i = seq.current++
      const id = `n${i}-${node.title.replace(/\s+/g, '-').toLowerCase()}`
      const x = node.x ?? 60 + (i % 5) * 28
      const y = node.y ?? 60 + (i % 5) * 28
      setItems((arr) => [...arr, { id, title: node.title, subtitle: node.subtitle, color: node.color, x, y }])
    },
  }))

  const removeNode = (id: string) => {
    setItems((arr) => arr.filter((n) => n.id !== id))
    setEdges((es) => es.filter((e) => e.from !== id && e.to !== id))
    if (selected === id) setSelected(null)
  }

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
        if (d.kind === 'node') setItems((arr) => arr.map((n) => (n.id === d.id ? { ...n, x: p.x - d.dx, y: p.y - d.dy } : n)))
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

  const byId = (id: string) => items.find((n) => n.id === id)
  const startNodeDrag = (e: ReactPointerEvent, id: string) => {
    e.preventDefault()
    const p = toCanvas(e.clientX, e.clientY)
    const n = byId(id)!
    setSelected(id)
    onSelect?.(id)
    setDrag({ kind: 'node', id, dx: p.x - n.x, dy: p.y - n.y })
  }
  const startWire = (e: ReactPointerEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    const n = byId(id)!
    setDrag({ kind: 'wire', from: id, x: n.x + PORT_X_OUT, y: n.y + PORT_Y })
  }

  const out = (id: string) => {
    const n = byId(id)!
    return { x: n.x + PORT_X_OUT, y: n.y + PORT_Y }
  }
  const inp = (id: string) => {
    const n = byId(id)!
    return { x: n.x + PORT_X_IN, y: n.y + PORT_Y }
  }

  return (
    <div className="ds-flow-canvas" ref={rootRef}>
      {items.map((n) => {
        const isDragging = drag?.kind === 'node' && drag.id === n.id
        return (
          <div
            key={n.id}
            className={`ds-flow-canvas__node${selected === n.id ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}`}
            style={{ transform: `translate(${n.x}px, ${n.y}px)`, width: NODE_W }}
            onPointerDown={(e) => startNodeDrag(e, n.id)}
          >
            <FlowNode title={n.title} subtitle={n.subtitle} color={n.color} />
            {/* удалить ноду с доски */}
            <button
              type="button"
              className="ds-flow-canvas__remove"
              aria-label={`Удалить ${n.title}`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => removeNode(n.id)}
            >
              ×
            </button>
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

      {/* нитки — ПОВЕРХ карточек (верхний слой), указатель не перехватывают */}
      <svg className="ds-flow-canvas__wires" aria-hidden="true">
        {edges.map((e, i) => {
          if (!byId(e.from) || !byId(e.to)) return null
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
    </div>
  )
})

export default FlowCanvas
