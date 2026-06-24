import {
  CardTop, Task, CardMetrica, CampaignPreview, Canban, Button,
} from '../../components'
import { PageFrame } from './PageFrame'

// Figma 1:4144 «Hiring_campaign» — секция Task (чеклист), строго по контенту макета.
const TASKS: { title: string; flagged: boolean; action: string }[] = [
  { title: 'Confirm budget allocation', flagged: true, action: 'Job description' },
  { title: 'Define role requirements and job description', flagged: true, action: 'Job description' },
  { title: 'Post job to job boards', flagged: true, action: 'Job description' },
  { title: 'Review applications', flagged: false, action: 'Review' },
  { title: 'Conduct initial interviews', flagged: false, action: 'Job description' },
  { title: 'Onboarding paperwork', flagged: false, action: 'Generate' },
]

const PIPELINE = [
  { title: 'Applied', count: 4, items: [
    { name: 'Michael Thompson', role: 'Product manager' }, { name: 'Emily Carter', role: 'UX designer' },
    { name: 'James Wilson', role: 'Data analyst' }, { name: 'Olivia Brown', role: 'Marketing specialist' },
  ] },
  { title: 'Screening', count: 6, items: [
    { name: 'Michael Thompson', role: 'Project manager' }, { name: 'Emily Davis', role: 'UX designer' },
    { name: 'David Garcia', role: 'Data analyst' }, { name: 'Jessica Martinez', role: 'Marketing specialist' },
    { name: 'Daniel Lee', role: 'Systems administrator' }, { name: 'Laura Wilson', role: 'Product owner' },
  ] },
  { title: 'Interview', count: 3, items: [
    { name: 'Michael Thompson', role: 'Product manager' }, { name: 'Jessica Williams', role: 'UI/UX designer' },
    { name: 'David Brown', role: 'Data scientist' },
  ] },
  { title: 'Offer', count: 1, items: [{ name: 'Sophia Martinez', role: 'UX designer' }] },
]

/** Экран 1:4144 «Hiring campaign» — кампания найма: yellow CardTop + Task-чеклист + метрики + воронка + пайплайн. */
export function HiringCampaign() {
  return (
    <PageFrame>
      <div className="-mx-ds-l flex flex-col gap-ds-xxs">
        <CardTop
          variant="default"
          name="Senior Frontend Developer Campaign"
          role="Active campaign"
          cornerLeft="Teams"
          cornerRight="Access"
          actions={['Finish', 'Cancel', 'Suspend', 'Fire']}
          activeAction="Finish"
          tags={['Frontend-team', 'Innovation Lab', 'Lead Developer', 'Member']}
          tagsRight={['Level 4 (code red)']}
        />

        {/* Task — белая карточка: заголовок-сериф + список задач (Task organism) */}
        <section className="flex flex-col gap-ds-l rounded-l bg-card-white p-ds-xl">
          <h2 className="m-0 font-display text-description leading-none text-text-primary">Task</h2>
          <div className="flex flex-col gap-ds-xxxs">
            {TASKS.map((t) => (
              <Task key={t.title} title={t.title} flagged={t.flagged}
                action={<Button variant="onColor">{t.action}</Button>} />
            ))}
          </div>
        </section>

        {/* 3 метрики-числа (CardMetrica) */}
        <div className="grid grid-cols-3 gap-ds-xxs [&>.ds-card-metrica]:w-full">
          <CardMetrica title="Applications" value={142} caption="Total received" />
          <CardMetrica title="in Progress" value={28} caption="Active candidates" />
          <CardMetrica title="Conversion Rate" value="19.7%" caption="To interview stage" />
        </div>

        {/* Funnel — CampaignPreview с 5 метриками */}
        <CampaignPreview
          title="Funnel"
          status={{ variant: 'green', label: 'Active' }}
          action={<Button variant="secondary">More info</Button>}
          metrics={[
            { value: 142, label: 'Applied' }, { value: 89, label: 'Rejected' }, { value: 282, label: 'In progress' },
            { value: 31, label: 'Final round' }, { value: 4, label: 'Offers sent' },
          ]}
        />

      </div>

      {/* Pipeline — full-width борд во всю ширину страницы (Figma: canban на уровне страницы) */}
      <div className="mt-ds-xxl w-screen ml-[calc(50%-50vw)]">
        <div className="mx-auto max-w-[1280px] px-ds-xl">
          <Canban title="Pipeline" columns={PIPELINE} />
        </div>
      </div>
    </PageFrame>
  )
}

export default HiringCampaign
