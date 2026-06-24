import type { ReactNode } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Button } from '../../components'

export interface PageFrameProps {
  children: ReactNode
  /** Этапы пайплайна — если заданы, Header показывает прогресс-бар + uppercase-стадии. */
  stages?: string[]
  /** Полноширинный hero над основным контентом (Figma 1:4013). w-full = ширина body (НЕ 100vw),
   *  поэтому нет паразитного горизонтального overflow на ширину скроллбара. */
  hero?: ReactNode
  /** Полноширинный блок под основным контентом (напр. Pipeline 1:2048) — тоже без 100vw. */
  after?: ReactNode
}

/**
 * PageFrame — общий каркас экранов (Figma `header` + центрированный контейнер 830px).
 * Шапка: логотип «Hired & Wired», CTA «Generate report», табы, user-menu, кнопка «← Back»
 * (стрелка в ряду крошек, Figma SecondRow) и хлебные крошки. Контент по центру (830px).
 * Полноширинные секции (hero/after) — отдельные `w-full`-слоты (НЕ 100vw): равны ширине body,
 * поэтому не создают горизонтального overflow и не требуют overflow-клипа. Скролл — естественный,
 * документом (никакого контейнерного скролла). Контент-колонка адаптивна (max-w-[830px] + max-w-full).
 */
export function PageFrame({ children, stages, hero, after }: PageFrameProps) {
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
      {hero && <div className="w-full">{hero}</div>}
      <main className="mx-auto w-[830px] max-w-full px-ds-l py-ds-xl">{children}</main>
      {after && <div className="w-full pb-ds-xxl">{after}</div>}
    </div>
  )
}

export default PageFrame
