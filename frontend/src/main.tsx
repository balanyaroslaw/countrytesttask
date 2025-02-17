import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import { MainPage } from './pages/main.page'
import { CountryPage } from './pages/country.page'
import './index.css'
import Router from './routes/router'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
          <Router/>
    </BrowserRouter>
  </StrictMode>,
)
