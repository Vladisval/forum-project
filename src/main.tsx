import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App/App.tsx'
import './shared/styles/index.scss'
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
