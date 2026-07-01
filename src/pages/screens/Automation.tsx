import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Button, Input, SwitchGroup, TextArea, FlowCanvas, FLOWNODE_DND_MIME } from '../../components'
import type { FlowCanvasNode, FlowCanvasHandle, FlowNodeColor } from '../../components'

// Figma 1:4230 «Automation» — библиотека узлов (цвета/тексты из узлов 1:4240–4246).
// bg — цвет кнопки библиотеки (токен); color — цвет ноды на канве (FlowNode) при добавлении.
const NODE_LIBRARY: { title: string; sub: string; bg: string; color: FlowNodeColor }[] = [
  { title: 'Start Trigger', sub: 'Initialize workflow', bg: 'oncard-red', color: 'red' },
  { title: 'Application Review', sub: 'Screen candidates', bg: 'oncard-red', color: 'red' },
  { title: 'Interview', sub: 'Schedule interviews', bg: 'oncard-red', color: 'red' },
  { title: 'Email Notification', sub: 'Send automated emails', bg: 'card-olive', color: 'olive' },
  { title: 'Conditional Logic', sub: 'Branch workflow paths', bg: 'card-olive', color: 'olive' },
  { title: 'Training Module', sub: 'Assign learning paths', bg: 'card-pink', color: 'pink' },
  { title: 'Progress Tracker', sub: 'Monitor development', bg: 'card-lavender', color: 'lavender' },
]
const TEMPLATES = ['Hiring funnel', 'Onboarding flow', 'Development plan']

// Канва (Figma 1:4253): позиции/цвета узлов 1:4254–4256, нитки → Final Decision.
const NODES: FlowCanvasNode[] = [
  { id: 'screening', title: 'Applicant Screening', subtitle: 'Review resumes and applications', color: 'red', x: 30, y: 70 },
  { id: 'interview', title: 'Interview Stage', subtitle: 'Conduct initial interviews', color: 'lavender', x: 40, y: 360 },
  { id: 'final', title: 'Final Decision', subtitle: 'Select candidate and extend offer', color: 'pink', x: 320, y: 210 },
]
const EDGES = [
  { from: 'screening', to: 'final' },
  { from: 'interview', to: 'final' },
]

/** Экран 1:4230 «Automation» — node-graph редактор: библиотека · канва (drag + нитки) · свойства. */
export function Automation() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('teams')
  const [props, setProps] = useState('Parametrs')
  const [nodeName, setNodeName] = useState('Welcome letter')
  const [propsOpen, setPropsOpen] = useState(true) // правая панель свойств — сворачиваемая (освобождает поле канвы)
  const canvasRef = useRef<FlowCanvasHandle>(null)
  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'))

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary">
      {/* фон-колонки (Figma layout grid 1:4230: 8 columns, offset 20, gutter 8, sage @10%) —
          самый нижний слой, не перехватывает клики; под нодами и панелями */}
      <div className="ds-column-grid pointer-events-none absolute inset-0 z-0 flex gap-ds-xs px-ds-m" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <i key={i} className="flex-1 bg-[var(--ds-color-grid-column)]" />
        ))}
      </div>

      <div className="relative z-10">
      <Header
        logo="Hired & Wired"
        action={<Button variant="cta">Generate report</Button>}
        tabs={[
          { label: 'All teams', value: 'teams' },
          { label: 'All templates', value: 'tpl' },
        ]}
        value={tab}
        onTabChange={setTab}
        userMenu="Profile · Log out"
        onBack={goBack}
        secondRowActions={
          <>
            <Button variant="secondary">Save</Button>
            <Button variant="cta">Deploy</Button>
          </>
        }
      />

      {/* 3 панели (Figma Frame 1407): library 350 · canvas flex · properties 350; наружный padding 30,
          зазор панель↔канва 8 (Figma gap 8px, не 30 — иначе «серая рамка» у панели).
          overflow-x-clip: ноду, задвинутую за боковую панель, клипаем на краю ряда → страница не скроллится
          (overflow:clip не создаёт скролл-контейнер и не трогает вертикаль). Панели — z поверх канвы (ниже).
          Адаптив: <1024 колонки в стопку (без гориз. overflow), ≥1024 — три колонки. */}
      <div className="ds-automation-row flex flex-col gap-ds-xl overflow-x-clip p-ds-xl lg:flex-row lg:items-start lg:gap-ds-xs">
        {/* LEFT — Automation / Node library / Templates (z-10: нода задвигается ПОД панель) */}
        <aside className="relative z-10 flex w-full flex-col gap-ds-xl rounded-l bg-card-white p-ds-xl lg:w-[350px] lg:shrink-0">
          <h1 className="m-0 font-display text-description leading-none text-text-primary">Automation</h1>
          <Input label="Automation name" defaultValue="Marketing funnel" />

          <section className="flex flex-col gap-ds-s">
            <h2 className="m-0 text-h3 text-text-primary">Node library</h2>
            <div className="flex flex-col gap-ds-xxxs">
              {NODE_LIBRARY.map((n) => (
                <button
                  key={n.title}
                  type="button"
                  draggable
                  title="Перетащи на канву или кликни, чтобы добавить"
                  onDragStart={(e) =>
                    e.dataTransfer.setData(
                      FLOWNODE_DND_MIME,
                      JSON.stringify({ title: n.title, subtitle: n.sub, color: n.color }),
                    )
                  }
                  onClick={() => canvasRef.current?.addNode({ title: n.title, subtitle: n.sub, color: n.color })}
                  className="flex cursor-grab flex-col gap-ds-xs rounded-s p-ds-s text-left transition-[box-shadow,transform] hover:shadow-[0_1px_3px_rgba(0,0,0,0.12)] active:translate-y-px"
                  style={{ background: `var(--ds-color-${n.bg})` }}
                >
                  <span className="text-text-gr text-text-primary">{n.title}</span>
                  <span className="font-pixel text-text-gr uppercase tracking-caps text-text-primary">{n.sub}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-ds-s">
            <h2 className="m-0 text-h3 text-text-primary">Templates</h2>
            <div className="flex flex-wrap gap-ds-xxs">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="rounded-over bg-control-secondary px-ds-s py-ds-xs font-pixel text-text-gr uppercase tracking-caps text-text-primary transition-colors hover:bg-control-secondary-hover"
                >
                  {t}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* CENTER — канва: drag-and-drop ноды + соединение нитками (z-0: под боковыми панелями) */}
        <main className="relative z-0 w-full lg:min-w-0 lg:flex-1 lg:self-stretch">
          <FlowCanvas
            ref={canvasRef}
            nodes={NODES}
            edges={EDGES}
            onSelect={(id) => {
              const n = NODES.find((x) => x.id === id)
              if (n) setNodeName(n.title)
            }}
          />
        </main>

        {/* RIGHT — Node Properties: сворачиваемая (z-10 — нода задвигается ПОД панель).
            Свёрнута → узкий rail с кнопкой развернуть; освободившееся место забирает канва (flex-1). */}
        {propsOpen ? (
          <aside className="relative z-10 flex w-full flex-col gap-ds-xl rounded-l bg-card-white p-ds-xl lg:w-[350px] lg:shrink-0">
            <div className="flex items-start justify-between gap-ds-s">
              <h1 className="m-0 font-display text-description leading-none text-text-primary">Node Properties</h1>
              <button
                type="button"
                onClick={() => setPropsOpen(false)}
                aria-label="Свернуть панель свойств"
                title="Свернуть"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-s text-text-primary transition-colors hover:bg-control-secondary focus-visible:[outline:var(--ds-focus-ring)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-ds-m">
              <Input label="Node name" value={nodeName} onChange={(e) => setNodeName(e.target.value)} />
              <SwitchGroup options={['Parametrs', 'Custom code']} value={props} onChange={setProps} />
              <TextArea label="Letter headline" placeholder="Type something here" rows={1} />
              <TextArea label="Main text" placeholder="Type something here" />
              <TextArea label="Body text" placeholder="Type something here" />
              <TextArea label="Bye-bye text" placeholder="Type something here" />
            </div>
            <div>
              <Button variant="cta">Save</Button>
            </div>
          </aside>
        ) : (
          <aside className="relative z-10 flex w-full shrink-0 items-center justify-between gap-ds-s rounded-l bg-card-white p-ds-s lg:w-11 lg:flex-col lg:items-center lg:gap-ds-m lg:py-ds-m">
            <button
              type="button"
              onClick={() => setPropsOpen(true)}
              aria-label="Развернуть панель свойств"
              title="Развернуть"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-s text-text-primary transition-colors hover:bg-control-secondary focus-visible:[outline:var(--ds-focus-ring)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <span className="font-pixel text-text-gr uppercase tracking-caps text-text-primary lg:[writing-mode:vertical-rl] lg:rotate-180">
              Node Properties
            </span>
          </aside>
        )}
      </div>
      </div>
    </div>
  )
}

export default Automation
