import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Button } from '../../components'
import { usePageNav } from '../pageNav'

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
  const navigate = useNavigate()
  // Табы шапки — реальная навигация по страницам (активный = текущий роут); логотип → каталог.
  const { tabs, value, onTabChange, toHome } = usePageNav()
  // «Назад»: к предыдущей странице, иначе в каталог превью.
  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }
  const header = (
    <Header
      logo={
        <button
          type="button"
          onClick={toHome}
          aria-label="На главную (каталог)"
          className="cursor-pointer appearance-none border-0 bg-transparent p-0 text-inherit transition-opacity [font:inherit] hover:opacity-70"
        >
          Hired &amp; Wired
        </button>
      }
      action={<Button variant="cta">Generate report</Button>}
      tabs={tabs}
      value={value}
      onTabChange={onTabChange}
      userMenu="Profile · Log out"
      breadcrumbs={['Home', 'Something', 'Something']}
      onBack={goBack}
      stages={stages}
    />
  )

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {hero ? (
        // hero-страницы: CardTop (Variant2) начинается от САМОГО ВЕРХА (100% ширины, вне main, без отступов).
        // Десктоп (≥768): прозрачная шапка абсолютно ПОВЕРХ hero. Мобайл: шапка в потоке НАД hero
        // (без наложения — на узких шапка переносится и стала бы высокой). Порядок в DOM: шапка → hero.
        <div className="relative">
          <div className="md:absolute md:inset-x-0 md:top-0 md:z-20">{header}</div>
          <div className="w-full">{hero}</div>
        </div>
      ) : (
        header
      )}
      <main className="mx-auto w-[830px] max-w-full px-ds-l py-ds-xl">{children}</main>
      {after && <div className="w-full pb-ds-xxl">{after}</div>}
    </div>
  )
}

export default PageFrame
