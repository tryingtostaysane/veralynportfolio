import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './components/Home.jsx'
import BioScent from './components/BioScent.jsx'
import CookPilot from './components/CookPilot.jsx'
import VisualEyes from './components/VisualEyes.jsx'
import AboutMe from './components/AboutMe.jsx'

// A "data router" (createBrowserRouter + RouterProvider) instead of the
// plain <BrowserRouter><Routes>...</Routes></BrowserRouter> this used to
// be - react-router only wraps a navigation in the browser's View
// Transitions API (see <Link viewTransition> in Home.jsx) when running
// under a data router; the declarative <BrowserRouter> just calls
// history.pushState directly and silently ignores that prop.
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/work/bioscent', element: <BioScent /> },
  { path: '/work/cookpilot', element: <CookPilot /> },
  { path: '/work/visualeyes', element: <VisualEyes /> },
  { path: '/about', element: <AboutMe /> },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}

export default App
