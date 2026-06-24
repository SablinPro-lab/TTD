import './Switch.css'

export type SwitchSize = 'small' | 'big'

export interface SwitchProps {
  /** Состояние переключателя. Figma: `switch=on | off`. */
  checked: boolean
  /** Размер. Figma: `size=big | small`. */
  size?: SwitchSize
  /** Подпись рядом со свитчем (на макете — «TEAM»). */
  label?: string
  /** Колбэк смены состояния. */
  onChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

/**
 * Switch — переключатель-чип с подписью.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `switch` (node 1:1758).
 * on → приподнятое (белое) состояние, off → приглушённое.
 */
export function Switch({
  checked,
  size = 'big',
  label,
  onChange,
  disabled = false,
  id,
}: SwitchProps) {
  const classes = [
    'ds-switch',
    `ds-switch--${size}`,
    checked ? 'ds-switch--on' : 'ds-switch--off',
  ].join(' ')

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      id={id}
      className={classes}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
    >
      {label && <span className="ds-switch__label">{label}</span>}
    </button>
  )
}

export default Switch
