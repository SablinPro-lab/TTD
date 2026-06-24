import type { ReactNode } from 'react'
import { MenuSwitch } from '../MenuSwitch'
import './TopMenu.css'

export interface TopMenuTab {
  label: string
  value: string
}

export interface TopMenuProps {
  /** Логотип/название слева. */
  logo?: ReactNode
  /** Кнопка-действие рядом с логотипом (напр. «Generate report»). */
  action?: ReactNode
  tabs?: TopMenuTab[]
  value?: string
  onTabChange?: (value: string) => void
  /** Правый блок (например, «Profile · Log out»). */
  userMenu?: ReactNode
}

/**
 * TopMenu — верхнее меню: логотип + действие + табы + пользовательское меню.
 * Источник правды: Figma → ds-organisms → `topmenu` (node 1:2001). Композирует MenuSwitch.
 * Раскладка Figma: SPACE_BETWEEN — слева [логотип · (действие + табы)], справа [Profile · Log out].
 */
export function TopMenu({ logo = 'Hired & Wired', action, tabs = [], value, onTabChange, userMenu }: TopMenuProps) {
  return (
    <div className="ds-topmenu">
      <div className="ds-topmenu__left">
        <span className="ds-topmenu__logo">{logo}</span>
        {(action || tabs.length > 0) && (
          <div className="ds-topmenu__controls">
            {action}
            <nav className="ds-topmenu__tabs">
              {tabs.map((t) => (
                <MenuSwitch key={t.value} label={t.label} active={t.value === value} onClick={() => onTabChange?.(t.value)} />
              ))}
            </nav>
          </div>
        )}
      </div>
      {userMenu && <span className="ds-topmenu__user">{userMenu}</span>}
    </div>
  )
}

export default TopMenu
