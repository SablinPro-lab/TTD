import { useState } from 'react'
import { CardTop, SwitchGroup, Notify, Profile } from '../../components'
import type { StatusVariant } from '../../components'
import { PageFrame } from './PageFrame'

// Figma 1:4071: имена/роли/статусы строго по макету. On Track→green, Rocket Growth→purple, Failing→red.
const PEOPLE: { name: string; role: string; progress: number; status: { variant: StatusVariant; label: string } }[] = [
  { name: 'Sarah Johnson', role: 'Senior Developer', progress: 92, status: { variant: 'green', label: 'On Track' } },
  { name: 'Michael Smith', role: 'Product Manager', progress: 100, status: { variant: 'purple', label: 'Rocket Growth' } },
  { name: 'Emily Davis', role: 'UX Designer', progress: 88, status: { variant: 'green', label: 'On Track' } },
  { name: 'David Brown', role: 'QA Engineer', progress: 100, status: { variant: 'purple', label: 'Rocket Growth' } },
  { name: 'Linda Garcia', role: 'Data Analyst', progress: 84, status: { variant: 'green', label: 'On Track' } },
  { name: 'James Wilson', role: 'Software Engineer', progress: 70, status: { variant: 'red', label: 'Failing' } },
  { name: 'Alice Thompson', role: 'Marketing Specialist', progress: 86, status: { variant: 'green', label: 'On Track' } },
  { name: 'Robert Martinez', role: 'Sales Executive', progress: 64, status: { variant: 'red', label: 'Failing' } },
  { name: 'Jessica Taylor', role: 'Content Strategist', progress: 90, status: { variant: 'green', label: 'On Track' } },
  { name: 'Charles Lee', role: 'Systems Analyst', progress: 72, status: { variant: 'red', label: 'Failing' } },
]

/** Экран 1:4071 «All teams one» — детальный обзор команды: glass-hero + notify + список людей. */
export function AllTeamsOne() {
  const [view, setView] = useState('Team')

  return (
    <PageFrame
      hero={
        <CardTop
          variant="glass"
          name="Engineering Team"
          role="Detailed team overview and performance metrics"
          segmented={
            <SwitchGroup
              options={['Team', 'Campaigns', 'Access']}
              value={view}
              onChange={setView}
            />
          }
        />
      }
    >
      <div className="-mx-ds-l flex flex-col gap-ds-xxs">
        <Notify>
          Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.
        </Notify>

        {/* Секция «Team» — белая карточка: заголовок-сериф + список строк-профилей (gap 2) */}
        <section className="flex flex-col gap-ds-xl rounded-l bg-card-white p-ds-xl">
          <h2 className="m-0 font-display text-description leading-none text-text-primary">Team</h2>
          <div className="flex flex-col gap-ds-xxxs">
            {PEOPLE.map((p) => (
              <Profile
                key={p.name}
                variant="long"
                name={p.name}
                role={p.role}
                status={p.status}
                progress={p.progress}
              />
            ))}
          </div>
        </section>
      </div>
    </PageFrame>
  )
}

export default AllTeamsOne
