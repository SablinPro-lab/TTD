import {
  CardTop,
  Notify,
  Button,
  Bar,
  Profile,
} from '../../components'
import { PageFrame } from './PageFrame'

const ACHIEVEMENTS: { label: string; sub: string }[] = [
  { label: 'Top performer', sub: 'Q4 2024' },
  { label: 'Team player', sub: 'Q4 2024' },
  { label: 'Innovator', sub: 'Q4 2023' },
  { label: 'Mentor', sub: 'Q4 2025' },
]

const STAGES = ['Onboarding', 'Adapting', 'Performing', 'Ready']

// Figma 1:4092: разноцветные пилюли из палитры.
const REPORTS: { name: string; role: string; color: 'peach' | 'mint' | 'pink' }[] = [
  { name: 'Michael Lee', role: 'Product manager', color: 'peach' },
  { name: 'Emily Carter', role: 'UX designer', color: 'mint' },
  { name: 'David Smith', role: 'Data analyst', color: 'pink' },
]

const MENTORING: { name: string; role: string; color: 'olive' | 'lavender' | 'peach' }[] = [
  { name: 'Michael Thompson', role: 'Project manager', color: 'olive' },
  { name: 'Emily Davis', role: 'UX designer', color: 'lavender' },
  { name: 'James Wilson', role: 'Data analyst', color: 'peach' },
]

/** Экран 1:4092 «Candidate» — карточка кандидата: yellow CardTop + notify + ачивки + развитие + связи. */
export function Candidate() {
  return (
    <PageFrame stages={['Applied', 'Interviewed', 'Onboarding', 'Half-term', 'Common', 'Leads team', 'Minus one', 'C-level', 'Fired']}>
      <div className="-mx-ds-l flex flex-col gap-ds-xxs">
        <CardTop
          variant="default"
          name="Sarah Mitchell"
          role="Senior Software Engineer"
          cornerLeft="Teams"
          cornerRight="Access"
          actions={['Promote', 'Negotiate', 'Suspend', 'Fire']}
          activeAction="Promote"
          tags={['frontend-team', 'Innovation Lab', 'Lead Developer', 'Member']}
          tagsRight={['Level 4 (code red)']}
        />

        <Notify action={<Button variant="onColor">More info</Button>}>
          Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.
        </Notify>

        {/* Achievements — оливковая карточка: заголовок + 4 колонки-метрики + кнопка */}
        <section className="flex flex-col gap-ds-xl rounded-l bg-card-olive p-ds-xl">
          <h2 className="m-0 font-display text-description leading-none text-text-primary">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-ds-m">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className="flex flex-col gap-ds-xs">
                <span className="font-display text-h3 leading-none text-text-primary">{a.label}</span>
                <span className="text-caps uppercase tracking-caps text-text-secondary">{a.sub}</span>
              </div>
            ))}
          </div>
          <div>
            <Button variant="secondary">All achievements</Button>
          </div>
        </section>

        {/* Personal Development — белая карточка: dotted-bar со стадиями + next level + кнопка */}
        <section className="flex flex-col gap-ds-xl rounded-l bg-card-white p-ds-xl">
          <h2 className="m-0 font-display text-description leading-none text-text-primary">Personal Development</h2>

          <div className="flex flex-col gap-ds-xs">
            <Bar value={62} size="big" tone="green" />
            <div className="flex justify-between">
              {STAGES.map((s) => (
                <span key={s} className="text-caps uppercase tracking-caps text-text-secondary">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-ds-m">
            <div className="flex flex-col gap-ds-xs">
              <span className="text-caps uppercase tracking-caps text-text-secondary">Next Level</span>
              <span className="text-h3 leading-none text-text-primary">Lead Software Engineer</span>
            </div>
            <div className="flex flex-col gap-ds-xxs">
              <span className="text-caps uppercase tracking-caps text-text-secondary">Prediction:</span>
              <span className="text-h3 leading-none text-text-primary">Febrary 2026</span>
            </div>
          </div>

          <div>
            <Button variant="secondary">More info</Button>
          </div>
        </section>

        {/* Reports to + Mentoring — белая карточка с двумя группами профилей-пилюль */}
        <section className="flex flex-col gap-ds-xxl rounded-l bg-card-white p-ds-xl">
          <div className="flex flex-col gap-ds-xl">
            <h2 className="m-0 font-display text-description leading-none text-text-primary">Reports to</h2>
            <div className="flex flex-wrap gap-ds-xxs">
              {REPORTS.map((p) => (
                <Profile key={p.name} variant="short" name={p.name} role={p.role} color={p.color} />
              ))}
            </div>
            <div>
              <Button variant="secondary">Org chart</Button>
            </div>
          </div>

          <div className="flex flex-col gap-ds-xl">
            <h2 className="m-0 font-display text-description leading-none text-text-primary">Mentoring:</h2>
            <div className="flex flex-wrap gap-ds-xxs">
              {MENTORING.map((p) => (
                <Profile key={p.name} variant="short" name={p.name} role={p.role} color={p.color} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageFrame>
  )
}

export default Candidate
