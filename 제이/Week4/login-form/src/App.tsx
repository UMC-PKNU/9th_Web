import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import MyPage from "./pages/MyPage.tsx";

// 홈페이지
// 로그인 페이지
// 회원가입 페이지

const router = createBrowserRouter( [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/my", element: <MyPage />},
    ],
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />; 
}

export default App;
