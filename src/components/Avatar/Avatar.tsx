import './Avatar.css'

export interface AvatarProps {
  /** URL картинки. Если нет — показываем силуэт (человек/собака). */
  src?: string
  /** Имя для alt/title. Figma-пресеты: katya, dog, petya. `dog` → силуэт-лапа. */
  name?: string
  /** Диаметр в px. Figma-дефолт = 30px. */
  size?: number
}

const isDog = (n?: string) => /dog|пёс|пес|собак/i.test(n || '')

const Person = () => (
  <svg className="ds-avatar__glyph" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="4" />
    <path d="M4.5 20c0-4.4 3.4-6.8 7.5-6.8s7.5 2.4 7.5 6.8z" />
  </svg>
)
const Paw = () => (
  <svg className="ds-avatar__glyph" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="7" cy="9.5" r="1.7" /><circle cx="12" cy="7.4" r="1.8" /><circle cx="17" cy="9.5" r="1.7" />
    <path d="M12 11.4c-3 0-5 2-5 4.3 0 1.9 2 2.7 5 2.7s5-.8 5-2.7c0-2.3-2-4.3-5-4.3z" />
  </svg>
)

/**
 * Avatar — круглый аватар: картинка или силуэт (человек/собака) на сером фоне с кольцом.
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `avatar` (node 1:1727).
 */
export function Avatar({ src, name, size = 30 }: AvatarProps) {
  return (
    <span className="ds-avatar" style={{ width: size, height: size }} title={name}>
      {src ? (
        <img className="ds-avatar__img" src={src} alt={name ?? ''} />
      ) : isDog(name) ? (
        <Paw />
      ) : (
        <Person />
      )}
    </span>
  )
}

export default Avatar
