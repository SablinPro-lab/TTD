import { useState } from 'react'
import {
  CardTop,
  SwitchGroup,
  Button,
  CardMetric,
  Team,
} from '../../components'
import { PageFrame } from './PageFrame'

// Figma 1:4015-4018: фоны метрик из палитры — card-red / card-pink / card-lavender / card-olive.
// Индикатор — `graph` (две скруглённые плитки bg-base, выровнены по низу): инстанс одинаков
// во всех 4 карточках → высоты [100,59] (Rectangle 82px + 48px). Не капсула — это graph (см. DECISIONS D50).
const METRICS = [
  { title: 'Health', caption: 'Overall: Good', color: 'red' as const, values: [100, 59] },
  { title: 'Productivity', caption: '+12% This Month', color: 'pink' as const, values: [100, 59] },
  { title: 'Distribution', caption: '8 Teams Active', color: 'lavender' as const, values: [100, 59] },
  { title: 'Hiring', caption: '15 Open Position', color: 'olive' as const, values: [100, 59] },
]

// Figma 1:4010: 6 идентичных карточек «Engineering Team» (клоны). Аватары — единый person (без dog).
const TEAMS = Array.from({ length: 6 }, () => ({
  name: 'Engineering Team',
  peopleCount: 24,
  productivity: '89%',
  highlight: 'Petya was drinking too much tea this week',
  members: [{}, {}, {}],
  extra: 21,
}))

/** Экран 1:4010 «All teams» — обзор всех команд: glass-hero + метрики + сетка команд. */
export function AllTeams() {
  const [view, setView] = useState('Overview')

  // Full-size hero (Figma 1:4013): фон во всю ширину страницы, контент центр. Передаём в слот hero
  // PageFrame (w-full, без 100vw — нет overflow). Центрирование/фон — внутри CardTop glass.
  const hero = (
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
  )

  return (
    <PageFrame hero={hero}>
      {/* секции выровнены по Figma-фрейму 830px; -mx-ds-l компенсирует горизонтальный padding main */}
      <div className="-mx-ds-l flex flex-col gap-ds-xxs">
        {/* 4-up метрик (адаптив: 2 на узких, 4 на ≥640). Карточки на равные доли по ширине
            (w-full переопределяет фикс-205); высота — фикс 195 (НЕ h-full, иначе график схлопывается) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-ds-xxs [&>.ds-card-metric]:w-full">
          {METRICS.map((m) => (
            <CardMetric key={m.title} title={m.title} caption={m.caption} color={m.color} values={m.values} />
          ))}
        </div>

        {/* команды (адаптив: 1 на узких, 2 на ≥640). Снимаем min-width карточки, чтобы укладывались */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-ds-xxs [&>.ds-team]:min-w-0">
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
