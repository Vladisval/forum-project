import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../../pages/Users/UsersPage.tsx";
import PostsPage from "../../pages/Posts/PostsPage.tsx";
import PostDetailPage from "../../pages/Posts/PostDetailsPage.tsx";
import App from "../App/App.tsx";
import UserProfilePage from "../../pages/UserProfile/UserProfilePage.tsx";


export const router = createBrowserRouter([
  { path: '/', element: <App /> , children: [
      {path: '', element: <PostsPage />},
      { path: '/users', element: <UsersPage /> },
      { path: '/post/:postId', element: <PostDetailPage /> },
      { path: '/profile', element: <UserProfilePage />},
    ]},

]);