import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routers/AppRouter'

import './index.css'
import App from './App.jsx'
const baseName = "";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter basename={baseName}  >
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  </StrictMode>,
)
