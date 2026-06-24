import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Подпись над полем (на макете — «HEAD LINE»), uppercase-caps. */
  label?: string
  /** Состояние ошибки (красная обводка + aria-invalid). */
  error?: boolean
}

/**
 * Input — текстовое поле с заголовком.
 * Состояния: focus (кольцо), error, disabled — с transitions.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `input` (node 1:1799).
 */
export function Input({ label, error, className, id, ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const wrapClasses = ['ds-input']
  if (error) wrapClasses.push('ds-input--error')
  if (className) wrapClasses.push(className)

  return (
    <div className={wrapClasses.join(' ')}>
      {label && (
        <label className="ds-input__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input id={inputId} className="ds-input__field" aria-invalid={error || undefined} {...rest} />
    </div>
  )
}

export default Input
