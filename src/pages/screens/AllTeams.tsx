import { useState } from 'react'
import {
  CardTop,
  SwitchGroup,
  Button,
  CardMetric,
  Team,
} from '../../components'
import { PageFrame } from './PageFrame'

// Figma 1:4010: фоны метрик из палитры — card-red / card-pink / card-lavender / card-olive.
// Индикатор — капсула (progress-pill).
const METRICS = [
  { title: 'Health', caption: 'Overall: Good', color: 'red' as const, progress: 84 },
  { title: 'Productivity', caption: '+12% This Month', color: 'pink' as const, progress: 72 },
  { title: 'Distribution', caption: '8 Teams Active', color: 'lavender' as const, progress: 58 },
  { title: 'Hiring', caption: '15 Open Position', color: 'olive' as const, progress: 46 },
]

// Figma 1:4010: 6 идентичных карточек «Engineering Team» (клоны).
const TEAMS = Array.from({ length: 6 }, () => ({
  name: 'Engineering Team',
  peopleCount: 24,
  productivity: '89%',
  highlight: 'Petya was drinking too much tea this week',
  members: [{}, { name: 'petya' }, { name: 'dog' }],
  extra: 21,
}))

/** Экран 1:4010 «All teams» — обзор всех команд: glass-hero + метрики + сетка команд. */
export function AllTeams() {
  const [view, setView] = useState('Overview')

  return (
    <PageFrame>
      {/* секции выровнены по Figma-фрейму 830px; -mx-ds-l компенсирует горизонтальный padding main */}
      <div className="-mx-ds-l flex flex-col gap-ds-xxs">
        <CardTop
          variant="glass"
          name="All teams"
          role="Overview of all teams and their performance metrics"
          segmented={
            <SwitchGroup
              options={['Overview', 'Employees', 'Report']}
              value={view}
              onChange={setView}
            />
          }
          footer={<Button variant="cta">Add team</Button>}
        />

        {/* 4-up метрик: карточки тянутся на равные доли (Figma flex-1), переопределяя их фикс-ширину */}
        <div className="grid grid-cols-4 gap-ds-xxs [&>.ds-card-metric]:h-full [&>.ds-card-metric]:w-full">
          {METRICS.map((m) => (
            <CardMetric key={m.title} title={m.title} caption={m.caption} color={m.color} progress={m.progress} />
          ))}
        </div>

        {/* 2-up команд: снимаем min-width карточки, чтобы две колонки уложились в 830px-фрейм */}
        <div className="grid grid-cols-2 gap-ds-xxs [&>.ds-team]:min-w-0">
          {TEAMS.map((t, i) => (
            <Team
              key={i}
              name={t.name}
              peopleCount={t.peopleCount}
              productivity={t.productivity}
              highlight={t.highlight}
              members={t.members}
              extra={t.extra}
            />
          ))}
        </div>
      </div>
    </PageFrame>
  )
}

export default AllTeams
