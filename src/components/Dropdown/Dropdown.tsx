import { useEffect, useId, useRef, useState } from 'react'
import './Dropdown.css'

export type DropdownVariant = 'default' | 'onColor'

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  /** Подпись над контролом (uppercase). */
  label?: string
  /** default — белый, onColor — коричнево-золотой. Figma: `Property 1=default | On color`. */
  variant?: DropdownVariant
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  id?: string
}

/**
 * Dropdown — выпадающий список, раскрывается ВНИЗ под контролом (кастомное меню, не нативный select).
 * Доступность: button[aria-expanded] + listbox/option, закрытие по Esc и клику вне.
 * Источник правды: Figma → ds-atoms → `dropdown` (node 1:1804).
 */
export function Dropdown({
  label,
  variant = 'default',
  options,
  value,
  placeholder = 'Choose…',
  onChange,
  id,
}: DropdownProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  // закрытие по клику вне и по Escape
  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (v: string) => {
    onChange?.(v)
    setOpen(false)
  }

  return (
    <div className={`ds-dropdown ds-dropdown--${variant}`} ref={rootRef}>
      {label && (
        <span className="ds-dropdown__label" id={`${fieldId}-label`}>
          {label}
        </span>
      )}
      <div className="ds-dropdown__wrap">
        <button
          type="button"
          id={fieldId}
          className={`ds-dropdown__control ds-dropdown__control--${variant} ${open ? 'is-open' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${fieldId}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`ds-dropdown__value ${selected ? '' : 'is-placeholder'}`}>
            {selected ? selected.label : placeholder}
          </span>
          <svg className="ds-dropdown__chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul className="ds-dropdown__menu" role="listbox" aria-labelledby={label ? `${fieldId}-label` : undefined}>
            {options.map((o) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                className={`ds-dropdown__option ${o.value === value ? 'is-selected' : ''}`}
                onClick={() => choose(o.value)}
              >
                {o.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dropdown
