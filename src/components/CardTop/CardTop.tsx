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
  /** Колбэк нажатия тега / «Add». */
  onTag?: (label: string) => void
  /** Цвет акцентной шапки (по умолчанию Figma yellow #ffb700). */
  accent?: string
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
  tags = [], tagsRight = [], onTag, accent,
}: CardTopProps) {
  const left = tags.map(normTag)
  const right = tagsRight.map(normTag)
  const renderTag = (t: CardTopTag, i: number) => (
    <div key={`${t.label}-${i}`} className="ds-card-top__tag-wrap">
      {t.headline && <span className="ds-card-top__tag-headline">{t.headline}</span>}
      <button type="button" className="ds-card-top__tag" onClick={() => onTag?.(t.label)}>
        <span className="ds-card-top__tag-label">{t.label}</span>
        <TagIcon />
      </button>
    </div>
  )

  return (
    <div className="ds-card-top" style={accent ? { background: accent } : undefined}>
      {(cornerLeft || cornerRight) && (
        <div className="ds-card-top__corners">
          <span>{cornerLeft}</span>
          <span>{cornerRight}</span>
        </div>
      )}

      <div className="ds-card-top__hero">
        <span className="ds-card-top__name">{name}</span>
        {role && <span className="ds-card-top__role">{role}</span>}
        {actions.length > 0 && (
          <div className="ds-card-top__actions">
            {actions.map((a) => (
              <button key={a} type="button" className="ds-card-top__pill" onClick={() => onAction?.(a)}>{a}</button>
            ))}
          </div>
        )}
      </div>

      {(left.length > 0 || right.length > 0) && (
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
      )}
    </div>
  )
}

export default CardTop
