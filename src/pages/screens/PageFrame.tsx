import type { ReactNode } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Button } from '../../components'

export interface PageFrameProps {
  children: ReactNode
  /** Этапы пайплайна — если заданы, Header показывает прогресс-бар + uppercase-стадии. */
  stages?: string[]
}

/**
 * PageFrame — общий каркас экранов (Figma `header` + центрированный контейнер 830px).
 * Шапка: логотип «Hired & Wired», CTA «Generate report», табы, user-menu, кнопка «← Back»
 * (стрелка в ряду крошек, Figma SecondRow) и хлебные крошки. Контент по центру (830px).
 */
export function PageFrame({ children, stages }: PageFrameProps) {
  const [tab, setTab] = useState('teams')
  const navigate = useNavigate()
  // «Назад»: к предыдущей странице, иначе в каталог превью.
  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }
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
        breadcrumbs={['Home', 'Something', 'Something']}
        onBack={goBack}
        stages={stages}
      />
      <main className="mx-auto w-[830px] max-w-full px-ds-l py-ds-xl">{children}</main>
    </div>
  )
}

export default PageFrame
