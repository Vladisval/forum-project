import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/index.scss'
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { store } from "./app/store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
