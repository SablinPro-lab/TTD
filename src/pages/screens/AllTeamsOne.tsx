import { useState } from 'react'
import { CardTop, SwitchGroup, Notify, Profile } from '../../components'
import { PageFrame } from './PageFrame'

const PEOPLE: { name: string; role: string; progress: number }[] = [
  { name: 'Sarah Johnson', role: 'Senior Developer', progress: 64 },
  { name: 'Michael Smith', role: 'Product Manager', progress: 58 },
  { name: 'Emily Davis', role: 'UX Designer', progress: 72 },
  { name: 'David Brown', role: 'Data Analyst', progress: 49 },
  { name: 'Linda Garcia', role: 'Data Engineer', progress: 81 },
  { name: 'James Wilson', role: 'Software Engineer', progress: 55 },
  { name: 'Alice Thompson', role: 'Marketing Specialist', progress: 67 },
  { name: 'Robert Martinez', role: 'QA Engineer', progress: 43 },
  { name: 'Jessica Taylor', role: 'UX Designer', progress: 76 },
  { name: 'Charles Lee', role: 'System Architect', progress: 60 },
]

/** Экран 1:4071 «All teams one» — детальный обзор команды: glass-hero + notify + список людей. */
export function AllTeamsOne() {
  const [view, setView] = useState('Team')

  return (
    <PageFrame>
      <div className="-mx-ds-l flex flex-col gap-ds-xxs">
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
                status={{ variant: 'green', label: 'On Track' }}
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
