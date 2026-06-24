import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Preview } from './pages/Preview'
import { ReleaseNotes } from './pages/ReleaseNotes'
import { AllTeams, AllTeamsOne, Candidate, HiringCampaign } from './pages/screens'

export const router = createBrowserRouter([
  { path: '/', element: <Preview /> },
  { path: '/release-notes', element: <ReleaseNotes /> },
  { path: '/pages/all-teams', element: <AllTeams /> },
  { path: '/pages/all-teams-one', element: <AllTeamsOne /> },
  { path: '/pages/candidate', element: <Candidate /> },
  { path: '/pages/hiring-campaign', element: <HiringCampaign /> },
  { path: '*', element: <Navigate to="/" replace /> },
])
