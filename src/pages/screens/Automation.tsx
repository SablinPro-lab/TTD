import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Button, Input, SwitchGroup, TextArea, FlowCanvas } from '../../components'
import type { FlowCanvasNode } from '../../components'

// Figma 1:4230 «Automation» — библиотека узлов (цвета/тексты из узлов 1:4240–4246).
const NODE_LIBRARY: { title: string; sub: string; bg: string }[] = [
  { title: 'Start Trigger', sub: 'Initialize workflow', bg: 'oncard-red' },
  { title: 'Application Review', sub: 'Screen candidates', bg: 'oncard-red' },
  { title: 'Interview', sub: 'Schedule interviews', bg: 'oncard-red' },
  { title: 'Email Notification', sub: 'Send automated emails', bg: 'card-olive' },
  { title: 'Conditional Logic', sub: 'Branch workflow paths', bg: 'card-olive' },
  { title: 'Training Module', sub: 'Assign learning paths', bg: 'card-pink' },
  { title: 'Progress Tracker', sub: 'Monitor development', bg: 'card-lavender' },
]
const TEMPLATES = ['Hiring funnel', 'Onboarding flow', 'Development plan']

// Канва (Figma 1:4253): позиции/цвета узлов 1:4254–4256, нитки → Final Decision.
const NODES: FlowCanvasNode[] = [
  { id: 'screening', title: 'Applicant Screening', subtitle: 'Review resumes and applications', color: 'red', x: 133, y: 156 },
  { id: 'interview', title: 'Interview Stage', subtitle: 'Conduct initial interviews', color: 'lavender', x: 161, y: 483 },
  { id: 'final', title: 'Final Decision', subtitle: 'Select candidate and extend offer', color: 'pink', x: 473, y: 268 },
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
  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'))

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
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

      {/* 3 панели (Figma Frame 1407): library 350 · canvas flex · properties 350; gap/padding 30 */}
      <div className="flex items-start gap-ds-xl p-ds-xl">
        {/* LEFT — Automation / Node library / Templates */}
        <aside className="flex w-[350px] shrink-0 flex-col gap-ds-xl rounded-l bg-card-white p-ds-xl">
          <h1 className="m-0 font-display text-description leading-none text-text-primary">Automation</h1>
          <Input label="Automation name" defaultValue="Marketing funnel" />

          <section className="flex flex-col gap-ds-s">
            <h2 className="m-0 text-h3 text-text-primary">Node library</h2>
            <div className="flex flex-col gap-ds-xxxs">
              {NODE_LIBRARY.map((n) => (
                <button
                  key={n.title}
                  type="button"
                  className="flex flex-col gap-ds-xs rounded-s p-ds-s text-left transition-[box-shadow,transform] hover:shadow-[0_1px_3px_rgba(0,0,0,0.12)] active:translate-y-px"
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

        {/* CENTER — канва: drag-and-drop ноды + соединение нитками */}
        <main className="min-w-0 flex-1 self-stretch">
          <FlowCanvas
            nodes={NODES}
            edges={EDGES}
            onSelect={(id) => {
              const n = NODES.find((x) => x.id === id)
              if (n) setNodeName(n.title)
            }}
          />
        </main>

        {/* RIGHT — Node Properties */}
        <aside className="flex w-[350px] shrink-0 flex-col gap-ds-xl rounded-l bg-card-white p-ds-xl">
          <h1 className="m-0 font-display text-description leading-none text-text-primary">Node Properties</h1>
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
      </div>
    </div>
  )
}

export default Automation
