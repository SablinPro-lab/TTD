import { Avatar } from '../Avatar'
import './AvatarGroup.css'

export interface AvatarGroupItem {
  name?: string
  src?: string
}

export interface AvatarGroupProps {
  /** Аватары в стопке. */
  items: AvatarGroupItem[]
  /** Диаметр каждого, px. Figma-дефолт = 30px. */
  size?: number
  /** Максимум видимых; остальные сворачиваются в «+N». */
  max?: number
}

/**
 * AvatarGroup — стопка перекрывающихся аватаров.
 * Источник правды: Figma → ds-atoms → `avatars` (node 1:1782).
 */
export function AvatarGroup({ items, size = 30, max }: AvatarGroupProps) {
  const visible = max ? items.slice(0, max) : items
  const rest = max ? items.length - visible.length : 0
  // Figma itemSpacing = -8px (фиксированный нахлёст, --ds-indent-xs)
  return (
    <span className="ds-avatars" style={{ ['--ds-avatars-overlap' as string]: 'var(--ds-indent-xs)' }}>
      {visible.map((it, i) => (
        <span key={i} className="ds-avatars__item">
          <Avatar name={it.name} src={it.src} size={size} />
        </span>
      ))}
      {rest > 0 && (
        <span className="ds-avatars__item ds-avatars__more" style={{ width: size, height: size, fontSize: Math.round(size * 0.35) }}>
          +{rest}
        </span>
      )}
    </span>
  )
}

export default AvatarGroup
