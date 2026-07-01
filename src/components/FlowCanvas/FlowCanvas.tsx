import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, DragEvent as ReactDragEvent } from 'react'
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
  /** id ноды-источника (чёрный выходной порт) → id ноды-приёмника (серый входной порт). */
  from: string
  to: string
}

/** Императивный API канвы: добавить ноду на доску (клик по библиотеке). */
export interface FlowCanvasHandle {
  addNode: (node: Omit<FlowCanvasNode, 'id' | 'x' | 'y'> & Partial<Pick<FlowCanvasNode, 'x' | 'y'>>) => void
}

export interface FlowCanvasProps {
  nodes: FlowCanvasNode[]
  edges?: FlowCanvasEdge[]
  /** Выбор ноды (клик/начало перетаскивания). */
  onSelect?: (id: string) => void
}

/** MIME для drag-and-drop из библиотеки на канву. Значение DataTransfer — JSON { title, subtitle, color }. */
export const FLOWNODE_DND_MIME = 'application/x-flownode'

/* Геометрия ноды (рендер FlowNode на канве, измерено): 280 ширина, точки-порты по Y=106
   (низ карточки − pad 14 − half-dot 5), центры точек X = 19 (серый/вход) / 261 (чёрный/выход). */
const NODE_W = 280
const PORT_Y = 106
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
 * FlowCanvas — рабочая канва автоматизаций (grid-фон):
 *  • ноды (FlowNode) перетаскиваются по доске;
 *  • ноды добавляются drag-and-drop из библиотеки (drop) и кликом (imperative addNode);
 *  • порты соединяются «нитками» (drag от ЧЁРНОГО выходного порта к серому входному); нитки крепятся
 *    точно к точкам и удаляются кликом по проводу (отключение);
 *  • «...» на ноде открывает контекстное меню с Delete.
 *  Нитки рисуются поверх карточек. Оптимизация: pointer на window + rAF; позиции через transform.
 *  Источник: Figma → ds-organisms (canvas 1:4253, node 1:4254).
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
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [hoverTarget, setHoverTarget] = useState<string | null>(null)
  const hoverInput = useRef<string | null>(null)
  const dragRef = useRef<Drag>(null)
  dragRef.current = drag
  const seq = useRef(0)

  const toCanvas = useCallback((clientX: number, clientY: number) => {
    const r = rootRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }, [])

  const addAt = useCallback(
    (node: Omit<FlowCanvasNode, 'id' | 'x' | 'y'>, x: number, y: number) => {
      const i = seq.current++
      const id = `n${i}-${node.title.replace(/\s+/g, '-').toLowerCase()}`
      setItems((arr) => [...arr, { id, title: node.title, subtitle: node.subtitle, color: node.color, x, y }])
    },
    [],
  )

  useImperativeHandle(ref, () => ({
    addNode: (node) => {
      const i = seq.current
      addAt(node, node.x ?? 60 + (i % 5) * 28, node.y ?? 60 + (i % 5) * 28)
    },
  }))

  const removeNode = (id: string) => {
    setItems((arr) => arr.filter((n) => n.id !== id))
    setEdges((es) => es.filter((e) => e.from !== id && e.to !== id))
    if (selected === id) setSelected(null)
    setMenuFor(null)
  }
  const removeEdge = (idx: number) => setEdges((es) => es.filter((_, j) => j !== idx))

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
      setHoverTarget(null)
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

  // закрытие контекстного меню «...» по клику вне / Esc
  useEffect(() => {
    if (!menuFor) return
    const close = () => setMenuFor(null)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuFor(null)
    window.addEventListener('pointerdown', close)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuFor])

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

  // drag-and-drop из библиотеки: drop кладёт ноду по позиции курсора (центрируем на курсоре)
  const onDrop = (e: ReactDragEvent) => {
    const raw = e.dataTransfer.getData(FLOWNODE_DND_MIME)
    if (!raw) return
    e.preventDefault()
    try {
      const node = JSON.parse(raw) as Omit<FlowCanvasNode, 'id' | 'x' | 'y'>
      const p = toCanvas(e.clientX, e.clientY)
      addAt(node, p.x - NODE_W / 2, p.y - PORT_Y / 2)
    } catch {
      /* ignore malformed payload */
    }
  }
  const onDragOver = (e: ReactDragEvent) => {
    if (e.dataTransfer.types.includes(FLOWNODE_DND_MIME)) e.preventDefault()
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
    <div className="ds-flow-canvas" ref={rootRef} onDrop={onDrop} onDragOver={onDragOver}>
      {items.map((n) => {
        const isDragging = drag?.kind === 'node' && drag.id === n.id
        const wiring = drag?.kind === 'wire'
        const inConnected = edges.some((e) => e.to === n.id)
        const outConnected = edges.some((e) => e.from === n.id)
        // порт-вход: подключён / приглашение при протяжке / наведён как цель
        const inClass = [
          'ds-flow-canvas__port',
          'ds-flow-canvas__port--in',
          inConnected ? 'is-connected' : '',
          wiring && drag.from !== n.id ? 'is-target' : '',
          wiring && hoverTarget === n.id && drag.from !== n.id ? 'is-hover' : '',
        ].filter(Boolean).join(' ')
        // порт-выход: подключён / источник текущей протяжки
        const outClass = [
          'ds-flow-canvas__port',
          'ds-flow-canvas__port--out',
          outConnected ? 'is-connected' : '',
          wiring && drag.from === n.id ? 'is-source' : '',
        ].filter(Boolean).join(' ')
        return (
          <div
            key={n.id}
            className={`ds-flow-canvas__node${selected === n.id ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}`}
            style={{ transform: `translate(${n.x}px, ${n.y}px)`, width: NODE_W }}
            onPointerDown={(e) => startNodeDrag(e, n.id)}
          >
            <FlowNode title={n.title} subtitle={n.subtitle} color={n.color} />

            {/* «...» — контекстное меню ноды (Delete) */}
            <button
              type="button"
              className="ds-flow-canvas__more"
              aria-label="Меню ноды"
              aria-haspopup="menu"
              aria-expanded={menuFor === n.id}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                setMenuFor((m) => (m === n.id ? null : n.id))
              }}
            />
            {menuFor === n.id && (
              <ul className="ds-flow-canvas__menu" role="menu" onPointerDown={(e) => e.stopPropagation()}>
                <li
                  role="menuitem"
                  className="ds-flow-canvas__menu-item ds-flow-canvas__menu-item--danger"
                  onClick={() => removeNode(n.id)}
                >
                  Delete
                </li>
              </ul>
            )}

            {/* входной порт (серый, слева) — приёмник нитки */}
            <span
              className={inClass}
              onPointerEnter={() => {
                hoverInput.current = n.id
                setHoverTarget(n.id)
              }}
              onPointerLeave={() => {
                if (hoverInput.current === n.id) hoverInput.current = null
                setHoverTarget((t) => (t === n.id ? null : t))
              }}
              aria-hidden="true"
            >
              <i className="ds-flow-canvas__dot" />
            </span>
            {/* выходной порт (чёрный, справа) — тянем нитку отсюда */}
            <span className={outClass} onPointerDown={(e) => startWire(e, n.id)} aria-hidden="true">
              <i className="ds-flow-canvas__dot" />
            </span>
          </div>
        )
      })}

      {/* нитки — поверх карточек; клик по проводу отключает (удаляет) связь */}
      <svg className="ds-flow-canvas__wires" aria-hidden="true">
        {edges.map((e, i) => {
          if (!byId(e.from) || !byId(e.to)) return null
          const a = out(e.from)
          const b = inp(e.to)
          const d = wirePath(a.x, a.y, b.x, b.y)
          return (
            <g key={`${e.from}-${e.to}-${i}`} className="ds-flow-canvas__edge">
              <path className="ds-flow-canvas__wire" d={d} />
              <path className="ds-flow-canvas__wire-hit" d={d} onClick={() => removeEdge(i)}>
                <title>Отключить связь</title>
              </path>
            </g>
          )
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
