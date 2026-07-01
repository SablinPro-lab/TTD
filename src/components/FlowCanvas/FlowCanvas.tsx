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
  onSelect?: (id: string) => void
}

/** MIME для drag-and-drop из библиотеки на канву. Значение DataTransfer — JSON { title, subtitle, color }. */
export const FLOWNODE_DND_MIME = 'application/x-flownode'

/* Геометрия ноды (рендер FlowNode на канве, измерено): 280×125, точки-порты Y=106 (низ − pad14 − 5),
   центры X = 19 (серый/вход) / 261 (чёрный/выход). */
const NODE_W = 280
const NODE_H = 125
const PORT_Y = 106
const PORT_X_IN = 19
const PORT_X_OUT = NODE_W - 19
/* при перетаскивании ноды не «упираются в стену»: можно свободно накладывать и уводить за край,
   удерживаем лишь минимум видимой части (чтобы ноду не потерять). overflow:hidden клипает остальное. */
const MIN_VISIBLE = 40

type Drag =
  | { kind: 'node'; id: string; dx: number; dy: number }
  | { kind: 'wire'; from: string; x: number; y: number }
  | null

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
/** Точка на кубической кривой Безье при t∈[0,1]. */
function bezierPt(x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number, t: number) {
  const u = 1 - t
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t
  return { x: a * x1 + b * cx1 + c * cx2 + d * x2, y: a * y1 + b * cy1 + c * cy2 + d * y2 }
}

/**
 * FlowCanvas — рабочая канва автоматизаций. Связи (нитки) рисуются на НАСТОЯЩЕМ HTML5 `<canvas>`
 * (программно по данным, DPR-чётко, ресайз через ResizeObserver, лёгкая rAF-анимация «сигнала» с
 * учётом prefers-reduced-motion). Ноды/порты/меню — интерактивный DOM поверх. Grid — CSS.
 *  • ноды: drag по доске (с клампом в границы), add (DnD из библиотеки + imperative), delete («...»→меню);
 *  • связи: connect (drag от чёрного выхода к серому входу), disconnect (клик по проводу — hit-test по canvas);
 *  • порты меняют цвет (чёрный подключён / серый свободен) с анимацией (см. CSS).
 *  Источник: Figma → ds-organisms (canvas 1:4253, node 1:4254).
 */
export const FlowCanvas = forwardRef<FlowCanvasHandle, FlowCanvasProps>(function FlowCanvas(
  { nodes: initialNodes, edges: initialEdges = [], onSelect },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)
  const [items, setItems] = useState<FlowCanvasNode[]>(initialNodes)
  const [edges, setEdges] = useState<FlowCanvasEdge[]>(initialEdges)
  const [drag, setDrag] = useState<Drag>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [hoverTarget, setHoverTarget] = useState<string | null>(null)
  const hoverInput = useRef<string | null>(null)
  const seq = useRef(0)

  // refs с актуальным состоянием — читаются из canvas-цикла без пересоздания эффекта
  const itemsRef = useRef(items); itemsRef.current = items
  const edgesRef = useRef(edges); edgesRef.current = edges
  const dragRef = useRef<Drag>(null); dragRef.current = drag
  const redrawRef = useRef<(() => void) | null>(null) // ручная перерисовка (reduced-motion)

  const toCanvas = useCallback((clientX: number, clientY: number) => {
    const r = rootRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }, [])
  const bounds = () => {
    const r = rootRef.current
    return { w: r?.clientWidth ?? 0, h: r?.clientHeight ?? 0 }
  }

  const addAt = useCallback((node: Omit<FlowCanvasNode, 'id' | 'x' | 'y'>, x: number, y: number) => {
    const i = seq.current++
    const id = `n${i}-${node.title.replace(/\s+/g, '-').toLowerCase()}`
    const { w, h } = bounds()
    setItems((arr) => [
      ...arr,
      {
        id, title: node.title, subtitle: node.subtitle, color: node.color,
        x: clamp(x, 0, Math.max(0, (w || NODE_W * 2) - NODE_W)),
        y: clamp(y, 0, Math.max(0, (h || NODE_H * 4) - NODE_H)),
      },
    ])
  }, [])

  useImperativeHandle(ref, () => ({
    addNode: (node) => {
      const i = seq.current
      addAt(node, node.x ?? 40 + (i % 5) * 26, node.y ?? 40 + (i % 5) * 26)
    },
  }))

  const removeNode = (id: string) => {
    setItems((arr) => arr.filter((n) => n.id !== id))
    setEdges((es) => es.filter((e) => e.from !== id && e.to !== id))
    if (selected === id) setSelected(null)
    setMenuFor(null)
  }
  const removeEdge = (idx: number) => setEdges((es) => es.filter((_, j) => j !== idx))

  // ── перетаскивание/соединение (pointer на window + rAF) ──
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
        if (d.kind === 'node') {
          const { w, h } = bounds()
          // свободно: можно накладывать друг на друга и уводить за край, но ≥MIN_VISIBLE остаётся видно
          setItems((arr) =>
            arr.map((n) =>
              n.id === d.id
                ? {
                    ...n,
                    x: clamp(p.x - d.dx, MIN_VISIBLE - NODE_W, w - MIN_VISIBLE),
                    y: clamp(p.y - d.dy, MIN_VISIBLE - NODE_H, h - MIN_VISIBLE),
                  }
                : n,
            ),
          )
        } else setDrag({ ...d, x: p.x, y: p.y })
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

  // закрытие меню «...» по клику вне / Esc
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

  // ── реальный canvas: grid остаётся CSS, здесь рисуем связи (DPR, ресайз, rAF, reduced-motion) ──
  useEffect(() => {
    const canvas = glRef.current
    const root = rootRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !root || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cs = getComputedStyle(document.documentElement)
    const wireColor = cs.getPropertyValue('--ds-color-black').trim() || '#000'
    const flowColor = cs.getPropertyValue('--ds-color-white').trim() || '#fff'
    let w = 0, h = 0, dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.5)
      w = root.clientWidth
      h = root.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    const stroke = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
      return { cx1: x1 + dx, cy1: y1, cx2: x2 - dx, cy2: y2 }
    }

    const render = (phase: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      const find = (id: string) => itemsRef.current.find((n) => n.id === id)
      // связи
      for (const e of edgesRef.current) {
        const a = find(e.from)
        const b = find(e.to)
        if (!a || !b) continue
        const x1 = a.x + PORT_X_OUT, y1 = a.y + PORT_Y, x2 = b.x + PORT_X_IN, y2 = b.y + PORT_Y
        const c = stroke(x1, y1, x2, y2)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.bezierCurveTo(c.cx1, c.cy1, c.cx2, c.cy2, x2, y2)
        ctx.setLineDash([])
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
        ctx.strokeStyle = wireColor
        ctx.lineWidth = 1.5
        ctx.stroke()
        // «сигнал» бежит по проводу (только если анимация разрешена)
        if (!reduce) {
          const t = (phase % 1600) / 1600
          const p = bezierPt(x1, y1, c.cx1, c.cy1, c.cx2, c.cy2, x2, y2, t)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = flowColor
          ctx.globalAlpha = 0.9
          ctx.shadowColor = wireColor
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.globalAlpha = 1
          ctx.shadowBlur = 0
        }
      }
      // live-провод при протяжке
      const d = dragRef.current
      if (d?.kind === 'wire') {
        const a = find(d.from)
        if (a) {
          const x1 = a.x + PORT_X_OUT, y1 = a.y + PORT_Y
          const c = stroke(x1, y1, d.x, d.y)
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.bezierCurveTo(c.cx1, c.cy1, c.cx2, c.cy2, d.x, d.y)
          ctx.setLineDash([5, 5])
          ctx.strokeStyle = wireColor
          ctx.globalAlpha = 0.6
          ctx.lineWidth = 1.5
          ctx.stroke()
          ctx.setLineDash([])
          ctx.globalAlpha = 1
        }
      }
    }

    // подгонка нод в границы канвы — не вылезают и не обрезаются overflow (mount + resize)
    const fit = () => {
      const maxX = Math.max(0, w - NODE_W)
      const maxY = Math.max(0, h - NODE_H)
      setItems((arr) => {
        let changed = false
        const next = arr.map((n) => {
          const x = clamp(n.x, 0, maxX)
          const y = clamp(n.y, 0, maxY)
          if (x !== n.x || y !== n.y) {
            changed = true
            return { ...n, x, y }
          }
          return n
        })
        return changed ? next : arr
      })
    }

    resize()
    fit()
    render(0)
    const ro = new ResizeObserver(() => {
      resize()
      fit()
      render(0)
    })
    ro.observe(root)

    let rafId = 0
    let t0 = 0
    if (!reduce) {
      const loop = (t: number) => {
        if (!t0) t0 = t
        render(t - t0)
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    } else {
      redrawRef.current = () => render(0)
    }

    return () => {
      ro.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
      redrawRef.current = null
    }
  }, [])

  // reduced-motion: перерисовка при изменениях (drag/add/remove/connect)
  useEffect(() => {
    redrawRef.current?.()
  }, [items, edges, drag])

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

  // отключение провода — клик по пустой области рядом с кривой (hit-test по семплам безье)
  const onRootPointerDown = (e: ReactPointerEvent) => {
    if (e.target !== rootRef.current) return // клики по нодам/портам обрабатывают они сами
    const p = toCanvas(e.clientX, e.clientY)
    let hit = -1
    let best = 8 // порог, px
    edges.forEach((ed, idx) => {
      const a = byId(ed.from)
      const b = byId(ed.to)
      if (!a || !b) return
      const x1 = a.x + PORT_X_OUT, y1 = a.y + PORT_Y, x2 = b.x + PORT_X_IN, y2 = b.y + PORT_Y
      const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
      for (let s = 0; s <= 24; s++) {
        const pt = bezierPt(x1, y1, x1 + dx, y1, x2 - dx, y2, x2, y2, s / 24)
        const dist = Math.hypot(pt.x - p.x, pt.y - p.y)
        if (dist < best) {
          best = dist
          hit = idx
        }
      }
    })
    if (hit >= 0) removeEdge(hit)
  }

  // drag-and-drop из библиотеки: drop кладёт ноду в точку курсора (центрируем)
  const onDrop = (e: ReactDragEvent) => {
    const raw = e.dataTransfer.getData(FLOWNODE_DND_MIME)
    if (!raw) return
    e.preventDefault()
    try {
      const node = JSON.parse(raw) as Omit<FlowCanvasNode, 'id' | 'x' | 'y'>
      const p = toCanvas(e.clientX, e.clientY)
      addAt(node, p.x - NODE_W / 2, p.y - PORT_Y / 2)
    } catch {
      /* ignore */
    }
  }
  const onDragOver = (e: ReactDragEvent) => {
    if (e.dataTransfer.types.includes(FLOWNODE_DND_MIME)) e.preventDefault()
  }

  return (
    <div className="ds-flow-canvas" ref={rootRef} onDrop={onDrop} onDragOver={onDragOver} onPointerDown={onRootPointerDown}>
      {items.map((n) => {
        const isDragging = drag?.kind === 'node' && drag.id === n.id
        const wiring = drag?.kind === 'wire'
        const inConnected = edges.some((e) => e.to === n.id)
        const outConnected = edges.some((e) => e.from === n.id)
        const inClass = [
          'ds-flow-canvas__port', 'ds-flow-canvas__port--in',
          inConnected ? 'is-connected' : '',
          wiring && drag.from !== n.id ? 'is-target' : '',
          wiring && hoverTarget === n.id && drag.from !== n.id ? 'is-hover' : '',
        ].filter(Boolean).join(' ')
        const outClass = [
          'ds-flow-canvas__port', 'ds-flow-canvas__port--out',
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
            <span className={outClass} onPointerDown={(e) => startWire(e, n.id)} aria-hidden="true">
              <i className="ds-flow-canvas__dot" />
            </span>
          </div>
        )
      })}

      {/* настоящий HTML5 canvas — связи/нитки (поверх карточек, не перехватывает указатель) */}
      <canvas className="ds-flow-canvas__gl" ref={glRef} aria-hidden="true" />
    </div>
  )
})

export default FlowCanvas
