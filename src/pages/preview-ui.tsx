import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
} from 'react'
import type { ReactNode } from 'react'

/* ── Иконки (inline svg, наследуют currentColor) ── */
const ic = 'w-4 h-4'
export const IconSun = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
  </svg>
)
export const IconMoon = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)
export const IconCopy = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)
export const IconCheck = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>
)
export const IconSearch = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
)
export const IconChevron = ({ className = ic }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
)
export const IconMenu = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
)
export const IconClose = () => (
  <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
)

/* ── Toast ── */
type ToastFn = (msg: string) => void
const ToastCtx = createContext<ToastFn>(() => {})
export const useToast = () => useContext(ToastCtx)
let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([])
  const push = useCallback<ToastFn>((msg) => {
    const id = ++toastId
    setToasts((t) => [...t, { id, msg }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200)
  }, [])
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-ds-l right-ds-l z-50 flex flex-col gap-ds-xs" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id}
            className="flex items-center gap-ds-xs rounded-m border border-lines bg-card-white px-ds-m py-ds-s text-m text-text-primary shadow-lg
                       animate-[toastIn_.18s_ease]">
            <span className="text-tech-green"><IconCheck /></span>{t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

/* ── Copy ── */
export function useCopy() {
  const toast = useToast()
  return useCallback((text: string, label = 'Скопировано') => {
    const done = () => toast(label)
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done)
    else done()
  }, [toast])
}

export function CopyCodeButton({ code }: { code: string }) {
  const copy = useCopy()
  const [hit, setHit] = useState(false)
  return (
    <button
      type="button"
      onClick={() => { copy(code, 'Код скопирован'); setHit(true); window.setTimeout(() => setHit(false), 1200) }}
      className="inline-flex items-center gap-ds-xxs rounded-s border border-lines bg-bg-base px-ds-xs py-1 text-caps tracking-caps uppercase
                 text-text-secondary transition-colors hover:text-text-primary hover:border-text-secondary
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple"
      aria-label="Копировать код компонента"
    >
      {hit ? <IconCheck /> : <IconCopy />} copy code
    </button>
  )
}

/* ── Theme toggle ── */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('ds-theme', next ? 'dark' : 'light') } catch { /* noop */ }
  }
  return (
    <button type="button" onClick={toggle} aria-pressed={dark} aria-label="Переключить тему"
      className="inline-flex h-9 w-9 items-center justify-center rounded-m border border-lines bg-card-white text-text-primary
                 transition-colors hover:border-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">
      {dark ? <IconSun /> : <IconMoon />}
    </button>
  )
}

/* ── Card ── */
export function Card({ id, name, level, desc, code, children }: {
  id: string; name: string; level: string; desc: string; code: string; children: ReactNode
}) {
  return (
    <section id={id} data-card={name.toLowerCase()}
      className="scroll-mt-28 flex flex-col gap-ds-m rounded-l border border-lines bg-card-white p-ds-l
                 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <header className="flex items-start justify-between gap-ds-m">
        <div className="flex flex-col gap-ds-xxs">
          <div className="flex items-center gap-ds-xs">
            <h3 className="m-0 font-display text-h3 text-text-primary">{name}</h3>
            <span className="rounded-s bg-bg-base px-ds-xs py-px text-caps tracking-caps uppercase text-text-secondary">{level}</span>
          </div>
          <p className="m-0 max-w-[52ch] text-text-secondary" style={{ fontSize: 13, lineHeight: 1.5 }}>{desc}</p>
        </div>
        <CopyCodeButton code={code} />
      </header>
      {/* min-w-0 + overflow-x-auto: широкое демо (десктоп-компоненты) скроллится ВНУТРИ карточки,
          не распирая страницу на узких экранах */}
      <div className="ds-demo flex min-w-0 max-w-full flex-wrap items-center gap-ds-m overflow-x-auto rounded-m bg-bg-base p-ds-m transition-colors">
        {children}
      </div>
    </section>
  )
}

/* ── Scroll-spy ── */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.5, 1] },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps
  const ref = useRef(active)
  ref.current = active
  return active
}
