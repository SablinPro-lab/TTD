import { createBrowserRouter, Navigate, Outlet, ScrollRestoration } from 'react-router-dom'
import { Preview } from './pages/Preview'
import { ReleaseNotes } from './pages/ReleaseNotes'
import { AllTeams, AllTeamsOne, Automation, Candidate, HiringCampaign } from './pages/screens'

/**
 * Root layout: <ScrollRestoration /> сбрасывает скролл НАВЕРХ при переходе на новую страницу
 * (раньше страница открывалась с позиции прокрутки превью — «снизу») и восстанавливает позицию
 * при back/forward. Скроллер — документ (window), что и нужно нашим страницам.
 */
function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Preview /> },
      { path: '/release-notes', element: <ReleaseNotes /> },
      { path: '/pages/all-teams', element: <AllTeams /> },
      { path: '/pages/all-teams-one', element: <AllTeamsOne /> },
      { path: '/pages/candidate', element: <Candidate /> },
      { path: '/pages/hiring-campaign', element: <HiringCampaign /> },
      { path: '/pages/automation', element: <Automation /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
