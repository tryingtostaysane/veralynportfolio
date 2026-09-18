import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// App.jsx now owns routing itself (a data router via createBrowserRouter
// + RouterProvider, needed for <Link viewTransition> to work) rather
// than wrapping it in <BrowserRouter> here.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
