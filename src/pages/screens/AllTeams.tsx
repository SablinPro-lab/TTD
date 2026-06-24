import { useState } from 'react'
import {
  CardTop,
  SwitchGroup,
  Button,
  CardMetric,
  Team,
} from '../../components'
import { PageFrame } from './PageFrame'

const METRICS = [
  { title: 'Health', caption: 'Overall: Good', color: 'red' as const, values: [100, 58] },
  { title: 'Productivity', caption: '+12% This Month', color: 'lavender' as const, values: [100, 58] },
  { title: 'Distribution', caption: '8 Teams Active', color: 'green' as const, values: [100, 58] },
  { title: 'Hiring', caption: '15 Open Position', color: 'olive' as const, values: [100, 58] },
]

const TEAMS = [
  { name: 'Engineering Team', peopleCount: 24, productivity: '89%', highlight: 'Petya was drinking too much tea this week', members: [{}, { name: 'petya' }, { name: 'dog' }], extra: 21 },
  { name: 'Design Team', peopleCount: 12, productivity: '76%', highlight: 'Shipped the new design system tokens', members: [{}, {}, {}], extra: 9 },
  { name: 'Product Team', peopleCount: 8, productivity: '82%', highlight: 'Closed three discovery interviews', members: [{}, {}, { name: 'dog' }], extra: 5 },
  { name: 'Marketing Team', peopleCount: 16, productivity: '68%', highlight: 'Launched the spring campaign', members: [{}, { name: 'petya' }, {}], extra: 13 },
  { name: 'Sales Team', peopleCount: 20, productivity: '91%', highlight: 'Hit quarterly quota two weeks early', members: [{}, {}, {}], extra: 17 },
  { name: 'Support Team', peopleCount: 10, productivity: '73%', highlight: 'Cut response time to under an hour', members: [{}, { name: 'dog' }, {}], extra: 7 },
]

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
            <CardMetric key={m.title} title={m.title} caption={m.caption} color={m.color} values={m.values} />
          ))}
        </div>

        {/* 2-up команд: снимаем min-width карточки, чтобы две колонки уложились в 830px-фрейм */}
        <div className="grid grid-cols-2 gap-ds-xxs [&>.ds-team]:min-w-0">
          {TEAMS.map((t) => (
            <Team
              key={t.name}
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
