import { useState } from 'react'
import type { FC } from 'react'
import {
  Button, Switch, Input, TextArea, Dropdown, SwitchGroup, Status, Tag, Bar,
  Avatar, AvatarGroup, Icon, Flag, ErrorBanner, ListItem, Graph,
  Profile, FlowNode, CampaignPreview, ProjectPreview, ExperiencePreview, Team,
  CardMetric, CardMetrica, Attempt, Notify,
  TopMenu, SecondRow, Header, Task, CardTop, MenuSwitch, Canban,
} from '../components'
import type { IconName } from '../components'
import { useToast } from './preview-ui'

export type Level = 'Atoms' | 'Molecules' | 'Organisms'
export interface Entry { id: string; name: string; level: Level; desc: string; code: string; Demo: FC }

const OPTS = [
  { label: 'Frontend-team', value: 'fe' }, { label: 'Backend-team', value: 'be' }, { label: 'Design-team', value: 'design' },
]
const MEMBERS = [{ name: 'Katya' }, { name: 'Dog' }, { name: 'Petya' }]

/* ───────────── Atoms ───────────── */

const ButtonDemo: FC = () => {
  const t = useToast()
  const [loading, setLoading] = useState(false)
  const run = () => { setLoading(true); window.setTimeout(() => { setLoading(false); t('Готово') }, 1100) }
  return (
    <>
      <Button variant="secondary" onClick={() => t('Secondary')}>More info</Button>
      <Button variant="onColor" onClick={() => t('On color')}>More info</Button>
      <Button variant="cta" onClick={() => t('CTA')}>More info</Button>
      <Button variant="cta" size="big" onClick={() => t('CTA big')}>More info</Button>
      <Button variant="node" subLabel="Subtitle" onClick={() => t('Node')}>More info</Button>
      <Button variant="cta" loading={loading} onClick={run}>{loading ? 'Loading' : 'Async'}</Button>
      <Button variant="cta" loading>Loading</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </>
  )
}

const SwitchDemo: FC = () => {
  const t = useToast()
  const [big, setBig] = useState(true)
  const [small, setSmall] = useState(false)
  return (
    <>
      <Switch label="Team" size="big" checked={big} onChange={(v) => { setBig(v); t(`big: ${v}`) }} />
      <Switch label="Team" size="small" checked={small} onChange={(v) => { setSmall(v); t(`small: ${v}`) }} />
    </>
  )
}

const SwitchGroupDemo: FC = () => {
  const t = useToast()
  const [v, setV] = useState('Overview')
  return <SwitchGroup options={['Overview', 'Employees', 'Report']} value={v} onChange={(x) => { setV(x); t(x) }} />
}

const InputDemo: FC = () => {
  const [v, setV] = useState('Michael Lee')
  return (
    <>
      <Input label="Head line" value={v} onChange={(e) => setV(e.target.value)} />
      <Input label="Error" defaultValue="not-an-email" error />
      <Input label="Disabled" defaultValue="Michael Lee" disabled />
    </>
  )
}
const TextAreaDemo: FC = () => <TextArea label="Head line" placeholder="Type something here" />

const DropdownDemo: FC = () => {
  const t = useToast()
  const [a, setA] = useState('')
  const [b, setB] = useState('fe')
  return (
    <>
      <Dropdown label="Head line" options={OPTS} value={a} onChange={(v) => { setA(v); t(v) }} />
      <Dropdown label="Head line" variant="onColor" options={OPTS} value={b} onChange={(v) => { setB(v); t(v) }} />
    </>
  )
}

const StatusDemo: FC = () => (
  <>
    <Status variant="purple">Rocket growth</Status><Status variant="green">On track</Status>
    <Status variant="red">Failing</Status><Status variant="stopped">Stopped</Status>
  </>
)

const TagDemo: FC = () => {
  const t = useToast()
  const [n, setN] = useState(0)
  return <><Tag variant="static">React</Tag><Tag variant="control" onClick={() => { setN(n + 1); t(`control ×${n + 1}`) }}>React</Tag></>
}

const BarDemo: FC = () => {
  const [v, setV] = useState(72)
  return (
    <div className="flex w-full flex-col gap-ds-s">
      <Bar value={v} /><Bar value={v} size="big" />
      <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))}
        className="w-full accent-tech-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple rounded-over" aria-label="Bar value" />
    </div>
  )
}

const AvatarDemo: FC = () => <><Avatar name="Katya" /><Avatar name="Dog" /><Avatar name="Petya" size={56} /></>
const AvatarGroupDemo: FC = () => <><AvatarGroup items={MEMBERS} /><AvatarGroup max={2} items={[...MEMBERS, { name: 'A' }]} /></>

const IconDemo: FC = () => {
  const t = useToast()
  const names: IconName[] = ['play', 'user', 'more', 'arrow-down', 'close']
  return (
    <>
      {names.map((n) => (
        <button key={n} type="button" onClick={() => t(n)} aria-label={n}
          className="rounded-s p-ds-xs text-text-primary transition-colors hover:bg-control-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple">
          <Icon name={n} />
        </button>
      ))}
    </>
  )
}

const FlagDemo: FC = () => {
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  return <><Flag active={a} onClick={() => setA(!a)} /><Flag active={b} onClick={() => setB(!b)} /></>
}

const ErrorDemo: FC = () => <ErrorBanner>Add more money for salary</ErrorBanner>

const ListDemo: FC = () => {
  const t = useToast()
  return <ListItem title="Sarah Johnson" meta={['Document', 'Created by Alan', '24.09.2025']}
    action={<Button variant="onColor" onClick={() => t('Edit Sarah')}>Edit</Button>} />
}

const GraphDemo: FC = () => {
  const t = useToast()
  const [vals, setVals] = useState([100, 60])
  return (
    <div className="flex flex-col items-start gap-ds-s">
      <Graph values={vals} />
      <Button variant="secondary" onClick={() => { setVals([20 + Math.round(Math.random() * 80), 20 + Math.round(Math.random() * 80)]); t('Перегенерировано') }}>Regenerate</Button>
    </div>
  )
}

/* ───────────── Molecules ───────────── */

const ProfileDemo: FC = () => (
  <div className="flex w-full flex-col gap-ds-m">
    <Profile variant="long" name="Sarah Johnson" role="Senior developer" status={{ variant: 'green', label: 'On track' }} progress={70} />
    <div className="flex flex-wrap gap-ds-m">
      <Profile variant="short" name="Sarah Johnson" role="Senior developer" />
      <Profile variant="short-outlined" name="Sarah Johnson" role="Senior developer" />
    </div>
  </div>
)
const FlowNodeDemo: FC = () => <FlowNode title="Start Trigger" subtitle="New application received" />
const CampaignDemo: FC = () => {
  const t = useToast()
  return <CampaignPreview title="Senior DevOps" status={{ variant: 'green', label: 'On track' }}
    action={<Button variant="secondary" onClick={() => t('More info')}>More info</Button>}
    metrics={[
      { value: 142, label: 'Applied' }, { value: 89, label: 'Rejected' }, { value: 282, label: 'In progress' },
      { value: 31, label: 'Final round' }, { value: 4, label: 'Offers sent' },
    ]} />
}
const ProjectDemo: FC = () => <ProjectPreview description="Full-stack e-commerce solution with React frontend and Node.js backend" tags={['React', 'Node.js', 'MongoDB']} />
const ExperienceDemo: FC = () => <ExperiencePreview period="Jan 2022 — present (3 years)" role="Senior Frontend Developer" company="TechCorp Solutions" description="Led development of React applications" />
const TeamDemo: FC = () => <Team name="Engineering Team" peopleCount={24} productivity="89%" highlight="Petya drank too much tea" members={MEMBERS} extra={21} />
const CardMetricDemo: FC = () => <CardMetric title="Health" caption="Overall: good" />
const CardMetricaDemo: FC = () => <CardMetrica title="Applications" value={142} caption="Total received" />
const AttemptDemo: FC = () => <Attempt status={{ variant: 'red', label: 'Failed' }}
  offers={[
    { label: 'First attempt', amount: '$8 750', perks: ['Lead role', 'Cookies', 'Free education'] },
    { label: 'Counter offer', amount: '$12 750', perks: ['Lead role', 'Remote-work', 'Gym'], align: 'right' },
  ]} />
const NotifyDemo: FC = () => {
  const t = useToast()
  return (
    <Notify action={<Button variant="onColor" onClick={() => t('More info')}>More info</Button>}>
      Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.
    </Notify>
  )
}

/* ───────────── Organisms ───────────── */

const MenuSwitchDemo: FC = () => {
  const t = useToast()
  const [a, setA] = useState('All teams')
  const items = ['All teams', 'All templates', 'Archive']
  return (
    <div className="flex gap-ds-xs rounded-s bg-control-secondary p-ds-xs">
      {items.map((it) => <MenuSwitch key={it} label={it} active={a === it} onClick={() => { setA(it); t(it) }} />)}
    </div>
  )
}
const TopMenuDemo: FC = () => {
  const t = useToast()
  const [tab, setTab] = useState('teams')
  return <TopMenu action={<Button variant="cta" onClick={() => t('Generate report')}>Generate report</Button>}
    tabs={[{ label: 'All teams', value: 'teams' }, { label: 'All templates', value: 'tpl' }]} value={tab} onTabChange={(v) => { setTab(v); t(v) }} userMenu="Profile · Log out" />
}
const SecondRowDemo: FC = () => {
  const t = useToast()
  return <SecondRow onBack={() => t('Back')} breadcrumbs={['Home', 'Something', 'Something']}
    actions={<><Button variant="secondary" onClick={() => t('Save')}>Save</Button><Button variant="cta" onClick={() => t('Deploy')}>Deploy</Button></>} />
}
const HeaderDemo: FC = () => {
  const t = useToast()
  const [tab, setTab] = useState('teams')
  return <Header action={<Button variant="cta" onClick={() => t('Generate report')}>Generate report</Button>}
    tabs={[{ label: 'All teams', value: 'teams' }, { label: 'Templates', value: 'tpl' }]} value={tab} onTabChange={setTab}
    userMenu="Profile · Log out" breadcrumbs={['Home', 'Something']} onBack={() => t('Back')}
    stages={['Applied', 'Interviewed', 'Onboarding', 'Final']} />
}
const TaskDemo: FC = () => {
  const t = useToast()
  const [flagged, setFlagged] = useState(true)
  return <Task title="Define role requirements and job description" flagged={flagged} error="Some field need your attention"
    action={<Button variant="secondary" onClick={() => { setFlagged(!flagged); t('Toggled flag') }}>Job description</Button>} />
}
const CardTopDemo: FC = () => {
  const t = useToast()
  return <CardTop name="Sarah Mitchell" role="Senior software engineer" cornerLeft="Teams" cornerRight="Access"
    actions={['Promote', 'Negotiate', 'Suspend', 'Fire']} onAction={(a) => t(a)}
    tags={['Frontend-team', 'Innovation Lab']} tagsRight={['Level 4 (code red)']} onTag={(x) => t(x)} />
}
const CanbanDemo: FC = () => (
  <Canban title="Pipeline" columns={[
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
  ]} />
)

/* ───────────── Реестр ───────────── */

export const CATALOG: Entry[] = [
  // Atoms
  { id: 'button', name: 'Button', level: 'Atoms', desc: 'Кнопка действия. Варианты secondary/onColor/cta/node, размеры, disabled, async-loading.', code: `<Button variant="cta" size="big" onClick={save}>More info</Button>`, Demo: ButtonDemo },
  { id: 'switch', name: 'Switch', level: 'Atoms', desc: 'Переключатель-чип (role=switch). on/off, размеры small/big.', code: `<Switch label="Team" checked={on} onChange={setOn} />`, Demo: SwitchDemo },
  { id: 'switchgroup', name: 'SwitchGroup', level: 'Atoms', desc: 'Сегментный single-select.', code: `<SwitchGroup options={['A','B']} value={v} onChange={setV} />`, Demo: SwitchGroupDemo },
  { id: 'input', name: 'Input', level: 'Atoms', desc: 'Текстовое поле с uppercase-заголовком.', code: `<Input label="Head line" value={v} onChange={e=>setV(e.target.value)} />`, Demo: InputDemo },
  { id: 'textarea', name: 'TextArea', level: 'Atoms', desc: 'Многострочный ввод.', code: `<TextArea label="Head line" placeholder="…" />`, Demo: TextAreaDemo },
  { id: 'dropdown', name: 'Dropdown', level: 'Atoms', desc: 'Выпадающий список, раскрывается вниз. default/onColor.', code: `<Dropdown label="Head line" options={opts} value={v} onChange={setV} />`, Demo: DropdownDemo },
  { id: 'status', name: 'Status', level: 'Atoms', desc: 'Индикатор состояния: точка + caps-подпись.', code: `<Status variant="green">On track</Status>`, Demo: StatusDemo },
  { id: 'tag', name: 'Tag', level: 'Atoms', desc: 'Чип: static / control (кликабельный).', code: `<Tag variant="control" onClick={fn}>React</Tag>`, Demo: TagDemo },
  { id: 'bar', name: 'Bar', level: 'Atoms', desc: 'Точечный прогресс-бар (dots): заполнение/пустое, размеры default/big.', code: `<Bar value={72} size="big" />`, Demo: BarDemo },
  { id: 'avatar', name: 'Avatar', level: 'Atoms', desc: 'Круглый аватар: силуэт (человек/собака) или картинка, с кольцом.', code: `<Avatar name="Katya" size={48} />`, Demo: AvatarDemo },
  { id: 'avatargroup', name: 'AvatarGroup', level: 'Atoms', desc: 'Стопка аватаров со сворачиванием в +N.', code: `<AvatarGroup items={items} max={4} />`, Demo: AvatarGroupDemo },
  { id: 'icon', name: 'Icon', level: 'Atoms', desc: 'Однотонные значки (кликабельны в демо).', code: `<Icon name="play" size={24} />`, Demo: IconDemo },
  { id: 'flag', name: 'Flag', level: 'Atoms', desc: 'Закладка on/off (toggle).', code: `<Flag active={on} onClick={()=>setOn(!on)} />`, Demo: FlagDemo },
  { id: 'errorbanner', name: 'ErrorBanner', level: 'Atoms', desc: 'Строка ошибки (role=alert).', code: `<ErrorBanner>Some error</ErrorBanner>`, Demo: ErrorDemo },
  { id: 'listitem', name: 'ListItem', level: 'Atoms', desc: 'Строка списка: заголовок + мета + действие.', code: `<ListItem title="…" meta={[…]} action={<Button>Edit</Button>} />`, Demo: ListDemo },
  { id: 'graph', name: 'Graph', level: 'Atoms', desc: 'Блочный график (regenerate).', code: `<Graph values={[100,60]} />`, Demo: GraphDemo },
  // Molecules
  { id: 'profile', name: 'Profile', level: 'Molecules', desc: 'Профиль: аватар + имя + роль. long/short/short-outlined.', code: `<Profile variant="long" name="…" role="…" status={…} progress={70} />`, Demo: ProfileDemo },
  { id: 'flownode', name: 'FlowNode', level: 'Molecules', desc: 'Нода автоматизации.', code: `<FlowNode title="Start Trigger" subtitle="…" />`, Demo: FlowNodeDemo },
  { id: 'campaignpreview', name: 'CampaignPreview', level: 'Molecules', desc: 'Карточка кампании: статус + метрики.', code: `<CampaignPreview title="…" metrics={[…]} action={…} />`, Demo: CampaignDemo },
  { id: 'projectpreview', name: 'ProjectPreview', level: 'Molecules', desc: 'Карточка проекта: описание + теги.', code: `<ProjectPreview description="…" tags={['React']} />`, Demo: ProjectDemo },
  { id: 'experiencepreview', name: 'ExperiencePreview', level: 'Molecules', desc: 'Блок опыта.', code: `<ExperiencePreview period="…" role="…" company="…" />`, Demo: ExperienceDemo },
  { id: 'team', name: 'Team', level: 'Molecules', desc: 'Карточка команды + аватары.', code: `<Team name="…" members={items} extra={21} />`, Demo: TeamDemo },
  { id: 'cardmetric', name: 'CardMetric', level: 'Molecules', desc: 'Карточка: заголовок + подпись-итог.', code: `<CardMetric title="Health" caption="Overall: good" />`, Demo: CardMetricDemo },
  { id: 'cardmetrica', name: 'CardMetrica', level: 'Molecules', desc: 'Карточка: заголовок + крупное число.', code: `<CardMetrica title="Applications" value={142} />`, Demo: CardMetricaDemo },
  { id: 'attempt', name: 'Attempt', level: 'Molecules', desc: 'Сравнение офферов: суммы + перки + статус.', code: `<Attempt status={…} offers={[…]} />`, Demo: AttemptDemo },
  { id: 'notify', name: 'Notify', level: 'Molecules', desc: 'Success-уведомление (dismiss).', code: `<Notify>New application received</Notify>`, Demo: NotifyDemo },
  // Organisms
  { id: 'menuswitch', name: 'MenuSwitch', level: 'Organisms', desc: 'Пункт-переключатель меню.', code: `<MenuSwitch label="All teams" active onClick={fn} />`, Demo: MenuSwitchDemo },
  { id: 'topmenu', name: 'TopMenu', level: 'Organisms', desc: 'Верхнее меню: логотип + действие + табы.', code: `<TopMenu action={…} tabs={[…]} value={v} onTabChange={setV} />`, Demo: TopMenuDemo },
  { id: 'secondrow', name: 'SecondRow', level: 'Organisms', desc: 'Тулбар: Back + крошки + действия.', code: `<SecondRow onBack={fn} breadcrumbs={[…]} actions={…} />`, Demo: SecondRowDemo },
  { id: 'header', name: 'Header', level: 'Organisms', desc: 'Шапка страницы: меню + тулбар + пайплайн.', code: `<Header tabs={[…]} stages={[…]} … />`, Demo: HeaderDemo },
  { id: 'task', name: 'Task', level: 'Organisms', desc: 'Карточка задачи: флаг + ошибка + действие.', code: `<Task title="…" flagged error="…" action={…} />`, Demo: TaskDemo },
  { id: 'cardtop', name: 'CardTop', level: 'Organisms', desc: 'Шапка-карточка профиля + пилюли-действия.', code: `<CardTop name="…" actions={[…]} onAction={fn} />`, Demo: CardTopDemo },
  { id: 'canban', name: 'Canban', level: 'Organisms', desc: 'Пайплайн-борд: серифный заголовок + колонки-стадии со списком людей.', code: `<Canban title="Pipeline" columns={[{title:'Applied',items:[…]}]} />`, Demo: CanbanDemo },
]

export const LEVELS: Level[] = ['Atoms', 'Molecules', 'Organisms']
