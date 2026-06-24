import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Button } from '../../components'

export interface PageFrameProps {
  children: ReactNode
  /** Этапы пайплайна — если заданы, Header показывает прогресс-бар + uppercase-стадии. */
  stages?: string[]
}

/**
 * PageFrame — общий каркас экранов (Figma `header` + центрированный контейнер 830px).
 * Шапка: логотип «Hired & Wired», CTA «Generate report», табы All teams / All templates,
 * user-menu, хлебные крошки. Контент по центру в ширину базового токена (830px).
 */
export function PageFrame({ children, stages }: PageFrameProps) {
  const [tab, setTab] = useState('teams')
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Link
        to="/"
        className="absolute left-ds-s top-ds-s z-50 rounded-m px-ds-xs py-ds-xxs text-caps uppercase tracking-caps text-text-secondary no-underline transition-colors hover:text-text-primary"
      >
        ← Back
      </Link>
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
        breadcrumbs={['Home', 'Something', 'Something']}
        stages={stages}
      />
      <main className="mx-auto w-[830px] max-w-full px-ds-l py-ds-xl">{children}</main>
    </div>
  )
}

export default PageFrame
