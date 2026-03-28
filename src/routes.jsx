import Home from './pages/Home.jsx'
import Info from './pages/Info.jsx'
import Planning from './pages/Planning.jsx'

export const navRoutes = [
  { path: '/', label: 'Home', element: <Home /> },
  { path: '/info', label: 'Info', element: <Info /> },
  { path: '/planning', label: 'Planning', element: <Planning /> },
]
