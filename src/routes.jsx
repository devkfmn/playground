import Home from './pages/Home.jsx'
import Info from './pages/Info.jsx'
import PlanIssue from './pages/PlanIssue.jsx'
import CreateIssue from './pages/CreateIssue.jsx'

export const navRoutes = [
  { path: '/', label: 'Home', element: <Home /> },
  { path: '/info', label: 'Info', element: <Info /> },
  { path: '/plan-issue', label: 'Plan Issue', element: <PlanIssue /> },
  { path: '/create-issue', label: 'Create Issue', element: <CreateIssue /> },
]
