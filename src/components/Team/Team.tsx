import { AvatarGroup } from '../AvatarGroup'
import type { AvatarGroupItem } from '../AvatarGroup'
import { Bar } from '../Bar'
import './Team.css'

export interface TeamProps {
  name: string
  peopleCount?: number
  productivity?: string
  /** «Хайлайт недели». */
  highlight?: string
  members?: AvatarGroupItem[]
  /** Сколько ещё участников (для «+N»). */
  extra?: number
}

/**
 * Team — карточка команды: название, метрики, хайлайт, аватары участников.
 * Источник правды: Figma → ds-molecules → `team` (node 1:1920, вариант 1:1921).
 */
export function Team({ name, peopleCount, productivity, highlight, members = [], extra }: TeamProps) {
  return (
    <div className="ds-team">
      <div className="ds-team__row">
        <span className="ds-team__name">{name}</span>
        {peopleCount != null && <span className="ds-team__people">{peopleCount} people</span>}
      </div>
      {productivity && (
        <div className="ds-team__prod">
          <div className="ds-team__prod-head">
            <span className="ds-team__label">Productivity</span>
            <span className="ds-team__value">{productivity}</span>
          </div>
          <Bar value={parseInt(productivity, 10) || 0} />
        </div>
      )}
      {highlight && (
        <div className="ds-team__highlight">
          <span className="ds-team__label">Week highlight:</span>
          <span className="ds-team__highlight-text">{highlight}</span>
        </div>
      )}
      {members.length > 0 && (
        <div className="ds-team__members">
          <AvatarGroup items={members} size={30} />
          {extra != null && <span className="ds-team__more">+{extra} more</span>}
        </div>
      )}
    </div>
  )
}

export default Team
