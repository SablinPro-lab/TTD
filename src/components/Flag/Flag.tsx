import './Flag.css'

export interface FlagProps {
  /** Отмечено ли. Figma: `Property 1=yes | no`. */
  active?: boolean
  /** Размер в px. */
  size?: number
  /** Клик (переключение). */
  onClick?: () => void
}

/**
 * Flag — закладка/флажок. `active` — залитая, иначе контурная.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `flag` (node 1:1767).
 */
export function Flag({ active = false, size = 24, onClick }: FlagProps) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      className={`ds-flag ds-flag--${active ? 'on' : 'off'}`}
      onClick={onClick}
      aria-pressed={onClick ? active : undefined}
      type={onClick ? 'button' : undefined}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12v18l-6-4-6 4V3z" />
      </svg>
    </Tag>
  )
}

export default Flag
