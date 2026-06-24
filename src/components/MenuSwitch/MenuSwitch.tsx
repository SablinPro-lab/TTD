import './MenuSwitch.css'

export interface MenuSwitchProps {
  label: string
  /** Активный пункт — белая пилюля. Figma: 2 варианта (active/plain). */
  active?: boolean
  onClick?: () => void
}

/**
 * MenuSwitch — пункт-переключатель меню (активный = белая пилюля).
 * Источник правды: Figma → ds-organisms → `menu_switch` (node 1:3782).
 */
export function MenuSwitch({ label, active = false, onClick }: MenuSwitchProps) {
  return (
    <button
      type="button"
      className={`ds-menu-switch ${active ? 'is-active' : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default MenuSwitch
