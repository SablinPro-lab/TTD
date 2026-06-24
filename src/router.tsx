import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Preview } from './pages/Preview'

export const router = createBrowserRouter([
  { path: '/', element: <Preview /> },
  { path: '*', element: <Navigate to="/" replace /> },
])
