import './Icon.css'

export type IconName = 'play' | 'user' | 'more' | 'arrow-down' | 'close'

export interface IconProps {
  /** Какой значок. Figma: `Property 1=play|user|more|arrow-down|close`. */
  name: IconName
  /** Размер в px. Figma-дефолт = 16px (канва иконки). */
  size?: number
  /** Доступное имя (по умолчанию = name). */
  title?: string
}

const PATHS: Record<IconName, JSX.Element> = {
  play: <path d="M6 4l14 8-14 8V4z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 4v12" />
      <path d="M6 12l6 6 6-6" />
      <path d="M5 21h14" />
    </>
  ),
  close: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </>
  ),
}

/**
 * Icon — однотонные значки дизайн-системы (наследуют currentColor).
 * Источник правды: Figma «Тестовая дизайн-система» → ds-atoms → `icons` (node 1:1747).
 */
export function Icon({ name, size = 16, title }: IconProps) {
  const filled = name === 'play'
  return (
    <svg
      className={`ds-icon ds-icon--${filled ? 'filled' : 'stroked'}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title ?? name}
    >
      {PATHS[name]}
    </svg>
  )
}

export default Icon
