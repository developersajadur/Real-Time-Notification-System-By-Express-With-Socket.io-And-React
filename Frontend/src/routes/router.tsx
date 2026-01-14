import AuthLayout from "@/pages/AuthLayout"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import { createBrowserRouter } from "react-router"

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
])

export default router
