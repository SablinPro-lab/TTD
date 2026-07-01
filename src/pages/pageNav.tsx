import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Навигация по страницам-экранам: табы шапки ведут между РЕАЛЬНЫМИ роутами,
 * активный таб подсвечивается по текущему пути. Один источник для всех страниц
 * (PageFrame + Automation) — не дублируем список и не хардкодим переходы.
 */
export interface PageNavItem {
  label: string
  value: string
  path: string
}

export const PAGE_NAV: PageNavItem[] = [
  { label: 'All teams', value: 'all-teams', path: '/pages/all-teams' },
  { label: 'Team', value: 'all-teams-one', path: '/pages/all-teams-one' },
  { label: 'Candidate', value: 'candidate', path: '/pages/candidate' },
  { label: 'Campaign', value: 'hiring-campaign', path: '/pages/hiring-campaign' },
  { label: 'Automation', value: 'automation', path: '/pages/automation' },
]

/** Табы шапки как навигация: value = активная страница (по пути), клик → переход; toHome → каталог. */
export function usePageNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const value = PAGE_NAV.find((p) => p.path === pathname)?.value ?? ''
  const onTabChange = (v: string) => {
    const item = PAGE_NAV.find((p) => p.value === v)
    if (item && item.path !== pathname) navigate(item.path)
  }
  const toHome = () => navigate('/')
  return {
    tabs: PAGE_NAV.map(({ label, value }) => ({ label, value })),
    value,
    onTabChange,
    toHome,
  }
}
