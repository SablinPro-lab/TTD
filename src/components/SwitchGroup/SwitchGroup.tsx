import './SwitchGroup.css'

export interface SwitchGroupProps {
  /** Опции сегментного переключателя. */
  options: string[]
  /** Выбранная опция. */
  value: string
  onChange?: (value: string) => void
}

/**
 * SwitchGroup — сегментный переключатель (группа из switch на белой плашке).
 * Источник правды: Figma → ds-atoms → `switch group` (node 1:1833).
 */
export function SwitchGroup({ options, value, onChange }: SwitchGroupProps) {
  return (
    <div className="ds-switch-group" role="tablist">
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={active}
            className={`ds-switch-group__item ${active ? 'is-active' : ''}`}
            onClick={() => onChange?.(opt)}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export default SwitchGroup
