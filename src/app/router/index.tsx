import { createBrowserRouter } from "react-router-dom";
import Users from "../../pages/Users/ui/Users.tsx";
import PostsPage from "../../pages/Posts/PostsPage.tsx";
import App from "../App/App.tsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: 'users',
      element: <Users />
    },
      {
        path: '',
        element: <PostsPage />
      }]
  },
]);