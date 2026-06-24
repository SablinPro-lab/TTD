import { Avatar } from '../Avatar'
import { Status } from '../Status'
import type { StatusVariant } from '../Status'
import { Bar } from '../Bar'
import './Profile.css'

export type ProfileVariant = 'long' | 'short' | 'short-outlined'

export interface ProfileProps {
  name: string
  role?: string
  avatarSrc?: string
  /** Вид. Figma: `Property 1=long | short | short-outlined`. */
  variant?: ProfileVariant
  /** Только для long: статус справа. */
  status?: { variant: StatusVariant; label: string }
  /** Только для long: прогресс 0–100 справа. */
  progress?: number
}

/**
 * Profile — строка/карточка профиля: аватар + имя + роль.
 * Источник правды: Figma → ds-molecules → `profile` (node 1:1853).
 */
export function Profile({ name, role, avatarSrc, variant = 'short', status, progress }: ProfileProps) {
  return (
    <div className={`ds-profile ds-profile--${variant}`}>
      <Avatar name={name} src={avatarSrc} size={30} />
      <span className="ds-profile__text">
        <span className="ds-profile__name">{name}</span>
        {role && <span className="ds-profile__role">{role}</span>}
      </span>
      {variant === 'long' && (status || progress != null) && (
        <span className="ds-profile__aside">
          {status && <Status variant={status.variant}>{status.label}</Status>}
          {progress != null && <Bar value={progress} />}
        </span>
      )}
    </div>
  )
}

export default Profile
