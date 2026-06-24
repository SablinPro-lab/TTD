import { Avatar } from '../Avatar'
import './Canban.css'

export interface CanbanItem {
  name: string
  role: string
}
export interface CanbanColumn {
  title: string
  /** Счётчик справа от заголовка (по умолчанию — длина items). */
  count?: number
  items: CanbanItem[]
}
export interface CanbanProps {
  /** Серифный заголовок над бордом. */
  title?: string
  columns: CanbanColumn[]
}

/**
 * Canban — пайплайн-борд: серифный заголовок + белая карточка с колонками-стадиями.
 * Каждая колонка: заголовок (сериф) + счётчик (серый) + список людей (аватар · имя · роль).
 * Источник правды: Figma → ds-organisms → `canban` (node 1:2048).
 */
export function Canban({ title = 'Pipeline', columns }: CanbanProps) {
  return (
    <div className="ds-canban">
      {title && <div className="ds-canban__title">{title}</div>}
      <div className="ds-canban__board">
        {columns.map((col, i) => (
          <div key={i} className="ds-canban__col">
            <div className="ds-canban__col-head">
              <span className="ds-canban__col-title">{col.title}</span>
              <span className="ds-canban__col-count">{col.count ?? col.items.length}</span>
            </div>
            <div className="ds-canban__list">
              {col.items.map((it, j) => (
                <div key={j} className="ds-canban__row">
                  <Avatar name={it.name} size={30} />
                  <span className="ds-canban__row-text">
                    <span className="ds-canban__row-name">{it.name}</span>
                    <span className="ds-canban__row-role">{it.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Canban
