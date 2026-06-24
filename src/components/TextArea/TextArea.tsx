import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import './TextArea.css'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Подпись над полем (uppercase). */
  label?: string
  /** Состояние ошибки (красная обводка + aria-invalid). */
  error?: boolean
}

/**
 * TextArea — многострочное поле ввода с uppercase-заголовком.
 * Состояния: focus (кольцо), error, disabled — с transitions.
 * Источник правды: Figma → ds-atoms → `text_area` (node 1:1794).
 */
export function TextArea({ label, error, className, id, rows = 3, ...rest }: TextAreaProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const wrap = ['ds-textarea']
  if (error) wrap.push('ds-textarea--error')
  if (className) wrap.push(className)
  return (
    <div className={wrap.join(' ')}>
      {label && (
        <label className="ds-textarea__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <textarea id={fieldId} className="ds-textarea__field" rows={rows} aria-invalid={error || undefined} {...rest} />
    </div>
  )
}

export default TextArea
