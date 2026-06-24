import type { ReactNode } from 'react'
import cardTopBg from '../../assets/cardtop-bg.jpg'
import cardTopGlass from '../../assets/cardtop-glass.jpg'
import './CardTop.css'

export interface CardTopTag {
  /** Текст пилюли-тега (Figma: frontend-team / Innovation Lab / …). */
  label: string
  /** Необязательная gold-микроподпись над тегом (Figma dropdown «head line»). */
  headline?: string
}

export interface CardTopProps {
  name: string
  /** Подзаголовок-роль (Figma: gold pixel «Senior Software Engineer»). */
  role?: string
  /** Подписи в углах шапки (слева/справа), напр. «Teams» / «Access». */
  cornerLeft?: string
  cornerRight?: string
  /** Кнопки-действия (белые пилюли), напр. Promote/Negotiate/Suspend/Fire. */
  actions?: string[]
  /** Колбэк нажатия пилюли-действия. */
  onAction?: (label: string) => void
  /** Теги-пилюли слева внизу (коричневые, с иконкой). Опционально + «Add». */
  tags?: (CardTopTag | string)[]
  /** Теги-пилюли справа внизу (напр. «Level 4 (code red)»). Опционально + «Add». */
  tagsRight?: (CardTopTag | string)[]
  /** Где располагать ряды тегов/дропдаунов: внизу (по умолч.) или вверху под углами
   *  (Figma 1:4147 «Hiring campaign»: дропдауны вверху, кнопки finish/cancel — внизу). */
  tagsPosition?: 'top' | 'bottom'
  /** Колбэк нажатия тега / «Add». */
  onTag?: (label: string) => void
  /** Цвет акцентной шапки (по умолчанию Figma yellow #ffb700). */
  accent?: string
  /** Вариант (Figma `Property 1`): default — жёлтая карточка-профиль; glass — стеклянный hero страницы. */
  variant?: 'default' | 'glass'
  /** Слот сегментного контрола снизу (glass-hero страниц: All teams / Engineering Team). */
  segmented?: ReactNode
  /** Доп. слот под сегментом (напр. кнопка на странице All teams). */
  footer?: ReactNode
  /** Активная пилюля-действие (тёмная) — Figma: PROMOTE active (#000). */
  activeAction?: string
}

function normTag(t: CardTopTag | string): CardTopTag {
  return typeof t === 'string' ? { label: t } : t
}

/** Иконка-стрелка вниз (Figma SF Symbol `􀄈` arrow.down.to.line — «применить/выбрать»). */
function TagIcon() {
  return (
    <svg className="ds-card-top__tag-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * CardTop — карточка-шапка профиля: акцентный блок с углами, именем-серифом,
 * gold-подзаголовком, белыми пилюлями-действиями и коричневыми тегами с иконками.
 * Источник правды: Figma → ds-organisms → `card_top` (node 1:3744, variant Default 1:3745).
 */
export function CardTop({
  name, role, cornerLeft, cornerRight, actions = [], onAction,
  tags = [], tagsRight = [], tagsPosition = 'bottom', onTag, accent, variant = 'default', segmented, footer, activeAction,
}: CardTopProps) {
  const glass = variant === 'glass'
  const left = tags.map(normTag)
  const right = tagsRight.map(normTag)
  const topTags = tagsPosition === 'top'
  const renderTag = (t: CardTopTag, i: number) => (
    <div key={`${t.label}-${i}`} className="ds-card-top__tag-wrap">
      {t.headline && <span className="ds-card-top__tag-headline">{t.headline}</span>}
      <button type="button" className="ds-card-top__tag" onClick={() => onTag?.(t.label)}>
        <span className="ds-card-top__tag-label">{t.label}</span>
        <TagIcon />
      </button>
    </div>
  )

  const cornersEl = (cornerLeft || cornerRight) ? (
    <div className="ds-card-top__corners">
      <span>{cornerLeft}</span>
      <span>{cornerRight}</span>
    </div>
  ) : null

  const tagsEl = (left.length > 0 || right.length > 0) ? (
    <div className="ds-card-top__tags">
      <div className="ds-card-top__tags-group">
        {left.map(renderTag)}
        {left.length > 0 && (
          <button type="button" className="ds-card-top__add" onClick={() => onTag?.('Add')}>Add</button>
        )}
      </div>
      <div className="ds-card-top__tags-group ds-card-top__tags-group--right">
        {right.map(renderTag)}
        {right.length > 0 && (
          <button type="button" className="ds-card-top__add" onClick={() => onTag?.('Add')}>Add</button>
        )}
      </div>
    </div>
  ) : null

  return (
    <div className={`ds-card-top ds-card-top--${variant}`}>
      {/* Фон. default (node 1:3745): фото + mix-blend color/hard-light жёлтый.
          glass (node 1:3768): широкое фото со стеклом, затухающее в bg-base. */}
      <div className="ds-card-top__bg" aria-hidden="true">
        {glass ? (
          // Figma 1:4013: чистое фоновое изображение, БЕЗ overlay/затухания (object-fit: cover)
          <img className="ds-card-top__bg-glass" src={cardTopGlass} alt="" />
        ) : (
          <>
            <img className="ds-card-top__bg-img" src={cardTopBg} alt="" />
            <span className="ds-card-top__bg-color" />
            <span className="ds-card-top__bg-tint" style={accent ? { background: accent } : undefined} />
          </>
        )}
      </div>

      {/* tagsPosition=top (Figma 1:4147): углы + дропдауны сгруппированы сверху */}
      {topTags ? (
        <div className="ds-card-top__top">
          {cornersEl}
          {tagsEl}
        </div>
      ) : cornersEl}

      <div className="ds-card-top__hero">
        <span className="ds-card-top__name">{name}</span>
        {role && <span className="ds-card-top__role">{role}</span>}
        {actions.length > 0 && (
          <div className="ds-card-top__actions">
            {actions.map((a) => (
              <button key={a} type="button" className={`ds-card-top__pill${a === activeAction ? ' is-active' : ''}`} onClick={() => onAction?.(a)}>{a}</button>
            ))}
          </div>
        )}
        {footer && <div className="ds-card-top__footer">{footer}</div>}
      </div>

      {/* glass-hero: сегментный контрол — отдельным блоком внизу карточки (Figma: switch_group y≈410) */}
      {segmented && <div className="ds-card-top__segmented">{segmented}</div>}

      {/* ряды тегов внизу (по умолчанию); при tagsPosition=top они уже отрисованы сверху */}
      {!topTags && tagsEl}
    </div>
  )
}

export default CardTop
