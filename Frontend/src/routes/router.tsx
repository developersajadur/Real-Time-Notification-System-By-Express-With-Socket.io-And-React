import AuthLayout from "@/pages/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoutes";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import PublicAuthRoute from "./PublicAuthRoute";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [{ index: true, element: <UserDashboard /> }],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [{ index: true, element: <AdminDashboard /> }],
  },
  {
    element: <PublicAuthRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
    ],
  },
]);
export default router;

//  element: <ProtectedRoute />, // any logged-in user
//    element: <ProtectedRoute allowedRoles={["admin"]} />,
