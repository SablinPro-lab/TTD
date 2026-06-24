import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

export type ButtonVariant = 'secondary' | 'onColor' | 'cta' | 'node'
export type ButtonSize = 'small' | 'big'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Визуальный вариант. Маппинг на Figma: secondary → `type=secondary`,
   *  onColor → `type=On color`, cta → `CTA?=yes`, node → `type=node`. */
  variant?: ButtonVariant
  /** Размер. `big` имеет смысл прежде всего для `variant="cta"` (Figma `CTA?=yes, type=big`). */
  size?: ButtonSize
  /** Состояние загрузки: спиннер + блокировка + aria-busy. */
  loading?: boolean
  /** Вторая строка для `variant="node"` — caps-подпись под заголовком (Figma node: title + subtitle). */
  subLabel?: string
}

/**
 * Button — базовая кнопка дизайн-системы.
 * Состояния: hover, focus-visible (кольцо), active, disabled, loading — с transitions.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `btn` (node 1:1840).
 */
export function Button({
  variant = 'secondary',
  size = 'small',
  loading = false,
  subLabel,
  className,
  type = 'button',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const classes = ['ds-button', `ds-button--${variant}`, `ds-button--${size}`]
  if (loading) classes.push('is-loading')
  if (className) classes.push(className)
  return (
    <button
      type={type}
      className={classes.join(' ')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="ds-button__spinner" aria-hidden="true" />}
      {children}
      {variant === 'node' && subLabel && (
        <span className="ds-button__sublabel">{subLabel}</span>
      )}
    </button>
  )
}

export default Button
