import type { ReactNode } from 'react'
import { TopMenu } from '../TopMenu'
import type { TopMenuTab } from '../TopMenu'
import { SecondRow } from '../SecondRow'
import { Bar } from '../Bar'
import './Header.css'

export interface HeaderProps {
  logo?: ReactNode
  action?: ReactNode
  tabs?: TopMenuTab[]
  value?: string
  onTabChange?: (value: string) => void
  userMenu?: ReactNode
  breadcrumbs?: string[]
  onBack?: () => void
  /** Действия справа во вторичном ряду (builder-вариант SecondRow): напр. Save / Deploy. */
  secondRowActions?: ReactNode
  /** Этапы пайплайна (uppercase-колонки под прогресс-баром). */
  stages?: string[]
  /** Заполнение прогресс-бара пайплайна 0–100 (Figma: `bar` в Frame 1382). */
  progress?: number
}

/**
 * Header — шапка страницы: верхнее меню + вторичный тулбар + ряд этапов пайплайна.
 * Источник правды: Figma → ds-organisms → `header` (node 1:2032). Композирует TopMenu, SecondRow, Bar.
 * Третий ряд (Figma Frame 1382): прогресс-бар (dots) + uppercase-подписи этапов под ним.
 */
export function Header({
  logo, action, tabs, value, onTabChange, userMenu, breadcrumbs, onBack, secondRowActions, stages = [], progress = 60,
}: HeaderProps) {
  return (
    <div className="ds-header">
      <TopMenu logo={logo} action={action} tabs={tabs} value={value} onTabChange={onTabChange} userMenu={userMenu} />
      {(onBack || (breadcrumbs && breadcrumbs.length > 0) || secondRowActions) && (
        <SecondRow onBack={onBack} breadcrumbs={breadcrumbs} actions={secondRowActions} />
      )}
      {stages.length > 0 && (
        <div className="ds-header__pipeline">
          <Bar value={progress} />
          <div className="ds-header__stages">
            {stages.map((s) => (
              <span key={s} className="ds-header__stage">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
