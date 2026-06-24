import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import notes from '../release-notes/release-notes.json'
import { ThemeToggle, IconSearch } from './preview-ui'

type Note = { date: string; component: string; type: string; change: string }
const ALL = notes as Note[]

const TYPE_CLS: Record<string, string> = {
  added: 'bg-tech-green text-text-on-color',
  changed: 'bg-tech-purple text-text-on-color',
  fixed: 'bg-text-brown text-text-on-color',
  deprecated: 'bg-tech-red text-text-on-color',
}

/** Страница Release Notes: дата · компонент|страница · изменение · тип. Зеркало Figma «Release Notes». */
export function ReleaseNotes() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const rows = useMemo(
    () => ALL.filter((n) => !term || `${n.component} ${n.change} ${n.type} ${n.date}`.toLowerCase().includes(term)),
    [term],
  )
  // группировка по дате (новые сверху)
  const groups = useMemo(() => {
    const m = new Map<string, Note[]>()
    for (const n of rows) { const a = m.get(n.date) ?? []; a.push(n); m.set(n.date, a) }
    return [...m.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [rows])

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <header className="sticky top-0 z-40 border-b border-lines bg-bg-base">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-ds-m px-ds-l py-ds-s">
          <Link to="/" className="rounded-m px-ds-xs py-1 text-caps tracking-caps uppercase text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">← Preview</Link>
          <span className="font-display text-h3">Release Notes</span>
          <span className="rounded-s bg-control-secondary px-ds-xs py-px text-caps tracking-caps uppercase text-text-secondary">{ALL.length} entries</span>
          <div className="ml-auto flex items-center gap-ds-s">
            <label className="flex items-center gap-ds-xs rounded-m border border-lines bg-card-white px-ds-s py-ds-xs text-text-secondary focus-within:border-text-secondary">
              <IconSearch />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск…"
                className="w-32 bg-transparent text-m text-text-primary outline-none placeholder:text-text-secondary sm:w-48" aria-label="Поиск по release notes" />
            </label>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col gap-ds-xl px-ds-l py-ds-xl">
        <div>
          <h1 className="m-0 font-display text-h1 leading-none">Release Notes</h1>
          <p className="mt-ds-xs max-w-[60ch] text-text-secondary">
            Все обновления дизайн-системы и страниц. Формат: дата · компонент/страница · что изменилось · тип.
            Зеркало страницы «Release Notes» в Figma.
          </p>
        </div>

        {groups.map(([date, items]) => (
          <section key={date} className="flex flex-col gap-ds-s">
            <h2 className="m-0 font-display text-h3 text-text-primary">{date}</h2>
            <div className="flex flex-col overflow-hidden rounded-l border border-lines bg-card-white">
              {items.map((n, i) => (
                <div key={i} className="grid grid-cols-[8rem_1fr_6rem] items-baseline gap-ds-m border-b border-lines px-ds-l py-ds-s last:border-0 max-sm:grid-cols-1 max-sm:gap-ds-xxs">
                  <span className="font-medium text-text-primary">{n.component}</span>
                  <span className="text-text-secondary" style={{ fontSize: 14, lineHeight: 1.5 }}>{n.change}</span>
                  <span className={`justify-self-start rounded-s px-ds-xs py-px text-caps tracking-caps uppercase ${TYPE_CLS[n.type] ?? 'bg-control-secondary text-text-secondary'}`}>{n.type}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 && <p className="text-text-secondary">Ничего не найдено.</p>}

        <footer className="border-t border-lines pt-ds-l text-caps tracking-caps uppercase text-text-secondary">
          Figma DS · release notes · обновляется при каждом изменении (см. CONTRIBUTING.md)
        </footer>
      </main>
    </div>
  )
}

export default ReleaseNotes
