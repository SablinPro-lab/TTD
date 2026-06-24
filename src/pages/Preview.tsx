import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ToastProvider, ThemeToggle, Card, useScrollSpy,
  IconSearch, IconChevron, IconMenu, IconClose,
} from './preview-ui'
import { CATALOG, LEVELS } from './preview-catalog'
import './preview.css'

/* Страницы, собранные из дизайн-системы (роуты вне превью-каталога). */
const PAGES: { to: string; label: string }[] = [
  { to: '/pages/all-teams', label: 'All teams' },
  { to: '/pages/all-teams-one', label: 'All teams one' },
  { to: '/pages/candidate', label: 'Candidate' },
  { to: '/release-notes', label: 'Release Notes' },
]

/* ── Styles-секция: данные ── */
const STYLE_ITEMS: { id: string; label: string }[] = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
]
const FONTS: [string, string][] = [
  ['font-sans', 'Grotesk · Akkurat LL Cyr TT'],
  ['font-display', 'Antiqa · Instrument Serif'],
  ['font-pixel', 'Pixel · Pixform'],
]
const SCALE: { label: string; px: number; cls: string }[] = [
  { label: 'h1', px: 84, cls: 'text-h1' },
  { label: 'description', px: 30, cls: 'text-description' },
  { label: 'h3', px: 20, cls: 'text-h3' },
  { label: 'M', px: 15, cls: 'text-m' },
  { label: 'text-gr', px: 11, cls: 'text-text-gr' },
  { label: 'caps', px: 8, cls: 'text-caps' },
]
const SWATCHES: [string, string][] = [
  ['bg-base', 'bg-bg-base'], ['control-secondary', 'bg-control-secondary'], ['lines', 'bg-lines'],
  ['text-primary', 'bg-text-primary'], ['text-secondary', 'bg-text-secondary'],
  ['super-yellow', 'bg-super-yellow'], ['tech-green', 'bg-tech-green'], ['tech-red', 'bg-tech-red'],
  ['tech-purple', 'bg-tech-purple'], ['text-brown', 'bg-text-brown'],
  ['card-red', 'bg-card-red'], ['card-pink', 'bg-card-pink'], ['card-lavender', 'bg-card-lavender'],
  ['card-olive', 'bg-card-olive'], ['card-green', 'bg-card-green'], ['card-peach', 'bg-card-peach'],
  ['oncard-yellow', 'bg-oncard-yellow'], ['oncard-red', 'bg-oncard-red'], ['bar-filled', 'bg-bar-filled'], ['black', 'bg-black'],
]
const SPACING: [string, number][] = [['xxxs', 2], ['xxs', 4], ['xs', 8], ['s', 14], ['m', 20], ['l', 24], ['xl', 30], ['xxl', 90]]
const RADII: { label: string; cls: string }[] = [
  { label: 'S · 4px', cls: 'rounded-s' }, { label: 'M · 8px', cls: 'rounded-m' },
  { label: 'L · 12px', cls: 'rounded-l' }, { label: 'Over · pill', cls: 'rounded-over' },
]

/* ── Навигация: модель ── */
type NavGroup = { id: string; label: string; items: { id: string; label: string }[] }
const GROUPS: NavGroup[] = [
  { id: 'styles', label: 'Styles', items: STYLE_ITEMS },
  ...LEVELS.map((lvl) => ({
    id: lvl.toLowerCase(),
    label: lvl,
    items: CATALOG.filter((e) => e.level === lvl).map((e) => ({ id: e.id, label: e.name })),
  })),
]
const ALL_ITEM_IDS = GROUPS.flatMap((g) => g.items.map((i) => i.id))

const lbl = 'text-caps tracking-caps uppercase text-text-secondary whitespace-nowrap'

function StyleBlock({ id, title, desc, children }: { id: string; title: string; desc: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 flex flex-col gap-ds-l rounded-l border border-lines bg-card-white p-ds-l shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-ds-xxs">
        <h3 className="m-0 font-display text-h3 text-text-primary">{title}</h3>
        <p className="m-0 text-text-secondary" style={{ fontSize: 13 }}>{desc}</p>
      </div>
      {children}
    </div>
  )
}

function StylesSection({ q }: { q: string }) {
  const show = (k: string) => k.toLowerCase().includes(q)
  const blocks = ['typography fonts шрифты кегли', 'colors цвета', 'spacing indents отступы', 'radius rounds радиусы']
  const visible = blocks.filter(show).length
  return (
    <section id="styles" className="scroll-mt-24 flex flex-col gap-ds-m">
      <SectionTitle title="Styles" count={visible} />
      <div className="flex flex-col gap-ds-l">
        {show(blocks[0]) && (
          <StyleBlock id="typography" title="Typography" desc="Три семейства и шкала кеглей.">
            <div className="flex flex-col">
              {FONTS.map(([cls, label]) => (
                <div key={cls} className="flex items-baseline justify-between gap-ds-m border-b border-lines py-ds-s first:pt-0 last:border-0">
                  <span className={`${cls} text-text-primary`} style={{ fontSize: 26 }}>The quick brown fox</span>
                  <span className={lbl}>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {SCALE.map((s) => (
                <div key={s.label} className="flex items-center gap-ds-l border-b border-lines py-ds-s first:pt-0 last:border-0">
                  <span className={`${s.cls} font-display leading-none text-text-primary`}>Ag</span>
                  <span className={`ml-auto ${lbl}`}>{s.label} · {s.px}px</span>
                </div>
              ))}
            </div>
          </StyleBlock>
        )}
        {show(blocks[1]) && (
          <StyleBlock id="colors" title="Colors" desc="Палитра токенов. Свотчи адаптируются к теме.">
            <div className="grid gap-ds-l grid-cols-[repeat(auto-fill,minmax(132px,1fr))]">
              {SWATCHES.map(([n, c]) => (
                <div key={n} className="flex flex-col gap-ds-xs">
                  <span className={`h-24 w-full rounded-m border border-lines ${c}`} />
                  <span className={lbl}>{n}</span>
                </div>
              ))}
            </div>
          </StyleBlock>
        )}
        {show(blocks[2]) && (
          <StyleBlock id="spacing" title="Spacing · indents" desc="Шкала отступов из токенов --ds-indent-*.">
            <div className="flex flex-col gap-ds-m">
              {SPACING.map(([n, px]) => (
                <div key={n} className="flex items-center gap-ds-l">
                  <span className="w-28 shrink-0 text-m text-text-secondary">{n} · {px}px</span>
                  <span className="h-6 rounded-s bg-tech-purple" style={{ width: `var(--ds-indent-${n})` }} />
                </div>
              ))}
            </div>
          </StyleBlock>
        )}
        {show(blocks[3]) && (
          <StyleBlock id="radius" title="Radius · rounds" desc="Скругления от S до пилюли.">
            <div className="flex flex-wrap items-end gap-ds-xl">
              {RADII.map((r) => (
                <div key={r.cls} className="flex flex-col items-center gap-ds-s">
                  <span className={`h-24 w-24 border border-lines bg-control-secondary ${r.cls}`} />
                  <span className={lbl}>{r.label}</span>
                </div>
              ))}
            </div>
          </StyleBlock>
        )}
      </div>
    </section>
  )
}

function SectionTitle({ title, count }: { title: string; count: number }) {
  return (
    <h2 className="m-0 flex items-baseline gap-ds-xs font-display text-description text-text-primary">
      {title} <span className="font-sans text-m text-text-secondary">· {count}</span>
    </h2>
  )
}

/* ── Левый навигатор ── */
function NavTree({
  q, setQ, active, collapsed, toggle, onNavigate,
}: {
  q: string
  setQ: (v: string) => void
  active: string
  collapsed: Record<string, boolean>
  toggle: (id: string) => void
  onNavigate: () => void
}) {
  const term = q.trim().toLowerCase()
  const match = (s: string) => !term || s.toLowerCase().includes(term)
  return (
    <div className="flex h-full flex-col gap-ds-m">
      <div className="flex flex-col gap-ds-xxs">
        <span className="font-display text-h3 leading-none">Design System</span>
        <span className={lbl}>{CATALOG.length} components</span>
      </div>

      <label className="flex items-center gap-ds-xs rounded-m border border-lines bg-bg-base px-ds-s py-ds-xs text-text-secondary focus-within:border-text-secondary">
        <IconSearch />
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск компонента…"
          className="w-full bg-transparent text-m text-text-primary outline-none placeholder:text-text-secondary"
          aria-label="Поиск компонента"
        />
        {q && (
          <button type="button" onClick={() => setQ('')} aria-label="Очистить поиск"
            className="rounded-s text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">
            <IconClose />
          </button>
        )}
      </label>

      <nav className="-mx-ds-xs flex flex-1 flex-col gap-ds-xxs overflow-y-auto px-ds-xs" aria-label="Навигация по компонентам">
        {GROUPS.map((g) => {
          const items = g.items.filter((i) => match(i.label))
          if (term && items.length === 0) return null
          const expanded = term ? true : !collapsed[g.id]
          const groupActive = items.some((i) => i.id === active)
          return (
            <div key={g.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggle(g.id)}
                aria-expanded={expanded}
                className={`group flex items-center justify-between gap-ds-xs rounded-m px-ds-s py-ds-xs text-caps tracking-caps uppercase transition-colors
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple
                  ${groupActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                <span className="flex items-center gap-ds-xs">
                  {g.label}
                  <span className="text-text-secondary">· {items.length}</span>
                </span>
                <IconChevron className={`h-4 w-4 transition-transform ${expanded ? '' : '-rotate-90'}`} />
              </button>
              {expanded && (
                <ul className="m-0 flex list-none flex-col gap-px p-0 pl-ds-xs">
                  {items.map((i) => (
                    <li key={i.id}>
                      <a
                        href={`#${i.id}`}
                        onClick={onNavigate}
                        aria-current={active === i.id ? 'true' : undefined}
                        className={`block rounded-m px-ds-s py-1.5 text-m transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple
                          ${active === i.id
                            ? 'bg-text-primary font-medium text-text-on-color'
                            : 'text-text-secondary hover:bg-control-secondary hover:text-text-primary'}`}
                      >
                        {i.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}

        {/* Pages — собранные из ДС страницы (ссылки на роуты) */}
        {(!term || PAGES.some((p) => p.label.toLowerCase().includes(term))) && (
          <div className="mt-ds-xs flex flex-col">
            <span className="flex items-center gap-ds-xs px-ds-s py-ds-xs text-caps tracking-caps uppercase text-text-secondary">
              Pages <span className="text-text-secondary">· {PAGES.length}</span>
            </span>
            <ul className="m-0 flex list-none flex-col gap-px p-0 pl-ds-xs">
              {PAGES.filter((p) => !term || p.label.toLowerCase().includes(term)).map((p) => (
                <li key={p.to}>
                  <Link to={p.to} onClick={onNavigate}
                    className="block rounded-m px-ds-s py-1.5 text-m text-text-secondary transition-colors hover:bg-control-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div className="flex items-center justify-between border-t border-lines pt-ds-s">
        <span className={lbl}>tokens · Figma</span>
        <ThemeToggle />
      </div>
    </div>
  )
}

function PreviewInner() {
  const [q, setQ] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  // левый sidebar: свёрнут по умолчанию; pinned (закреплён открытым) сохраняется, hovered — временно
  const [pinned, setPinned] = useState(() => {
    try { return localStorage.getItem('ds-nav-pinned') === '1' } catch { return false }
  })
  const [hovered, setHovered] = useState(false)
  const railOpen = pinned || hovered
  const togglePin = () => setPinned((p) => {
    const v = !p
    try { localStorage.setItem('ds-nav-pinned', v ? '1' : '0') } catch { /* noop */ }
    return v
  })
  const active = useScrollSpy(ALL_ITEM_IDS)
  const toggle = (id: string) => setCollapsed((c) => ({ ...c, [id]: !c[id] }))
  const term = q.trim().toLowerCase()
  const matches = (name: string, desc: string) => !term || (name + ' ' + desc).toLowerCase().includes(term)

  // блокируем скролл body, когда открыт мобильный drawer
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [navOpen])
  // Esc закрывает drawer
  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNavOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [navOpen])

  return (
    <div className="min-h-screen bg-bg-base text-text-primary lg:flex">
      {/* desktop sidebar — свёрнут по умолчанию (рельс 56px); разворот по hover/клику, плавно.
          Раскрытая панель оверлеит контент (не двигает раскладку), pinned сохраняется. */}
      <aside
        className="sticky top-0 z-30 hidden h-screen w-14 shrink-0 lg:block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Боковая навигация"
      >
        <div
          className={`absolute inset-y-0 left-0 flex h-screen flex-col overflow-hidden border-r border-lines bg-card-white
            transition-[width] duration-200 ease-out ${railOpen ? 'w-72 p-ds-l shadow-[0_10px_34px_rgba(0,0,0,0.08)]' : 'w-14 items-center py-ds-l'}`}
        >
          {railOpen ? (
            <>
              <button
                type="button" onClick={togglePin} aria-pressed={pinned}
                aria-label={pinned ? 'Свернуть меню' : 'Закрепить меню открытым'}
                className="mb-ds-s self-end rounded-m p-ds-xxs text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple"
              >
                <IconChevron className="h-4 w-4 rotate-90" />
              </button>
              <NavTree q={q} setQ={setQ} active={active} collapsed={collapsed} toggle={toggle} onNavigate={() => {}} />
            </>
          ) : (
            <button
              type="button" onClick={togglePin} aria-expanded={false} aria-label="Развернуть меню"
              className="rounded-m p-ds-xs text-text-primary transition-colors hover:bg-control-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple"
            >
              <IconMenu />
            </button>
          )}
        </div>
      </aside>

      {/* mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setNavOpen(false)} aria-hidden="true" />
          <aside className="absolute left-0 top-0 h-full w-[19rem] max-w-[85%] border-r border-lines bg-card-white p-ds-l shadow-[0_10px_34px_rgba(0,0,0,0.2)]" role="dialog" aria-modal="true" aria-label="Меню">
            <button type="button" onClick={() => setNavOpen(false)} aria-label="Закрыть меню"
              className="absolute right-ds-s top-ds-s rounded-m border border-lines p-ds-xs text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">
              <IconClose />
            </button>
            <NavTree q={q} setQ={setQ} active={active} collapsed={collapsed} toggle={toggle} onNavigate={() => setNavOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <header className="sticky top-0 z-40 flex items-center gap-ds-m border-b border-lines bg-bg-base px-ds-l py-ds-s lg:hidden">
          <button type="button" onClick={() => setNavOpen(true)} aria-label="Открыть меню" aria-expanded={navOpen}
            className="rounded-m border border-lines bg-card-white p-ds-xs text-text-primary transition-colors hover:border-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">
            <IconMenu />
          </button>
          <span className="font-display text-h3 leading-none">Design System</span>
          <div className="ml-auto"><ThemeToggle /></div>
        </header>

        <main className="mx-auto flex w-full max-w-5xl flex-col gap-ds-xxl px-ds-l py-ds-xl">
          <div>
            <h1 className="m-0 font-display text-h1 leading-none">Preview</h1>
            <p className="mt-ds-xs max-w-[60ch] text-text-secondary">
              Живой каталог дизайн-системы. Слева — навигатор по разделам и компонентам. Все контролы рабочие,
              переключение темы, поиск, copy-code.
            </p>
          </div>

          <StylesSection q={term} />

          {LEVELS.map((level) => {
            const items = CATALOG.filter((e) => e.level === level && matches(e.name, e.desc))
            return (
              <section key={level} id={level.toLowerCase()} className="scroll-mt-24 flex flex-col gap-ds-m">
                <SectionTitle title={level} count={items.length} />
                {items.length === 0 ? (
                  <p className="text-text-secondary">Ничего не найдено.</p>
                ) : (
                  <div className="flex flex-col gap-ds-l">
                    {items.map((e) => (
                      <Card key={e.id} id={e.id} name={e.name} level={e.level} desc={e.desc} code={e.code}>
                        <e.Demo />
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            )
          })}

          <footer className="border-t border-lines pt-ds-l text-caps tracking-caps uppercase text-text-secondary">
            Figma DS · {CATALOG.length} components · tokens from remote Figma library
          </footer>
        </main>
      </div>
    </div>
  )
}

/** Премиальный превью-каталог дизайн-системы (единственная страница приложения). */
export function Preview() {
  return (
    <ToastProvider>
      <PreviewInner />
    </ToastProvider>
  )
}

export default Preview
