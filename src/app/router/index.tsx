import { createBrowserRouter } from "react-router-dom";
import Tasks from "../../pages/Posts/ui/Tasks.tsx";
import Home from "../../pages/Home/Home.tsx";
import App from "../App/App.tsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: 'tasks',
      element: <Tasks />
    },
      {
        path: '',
        element: <Home />
      }]
  },
]);