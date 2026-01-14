import AuthLayout from "@/pages/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoutes";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import PublicAuthRoute from "./PublicAuthRoute";
import CreateCategory from "@/pages/CreateCategory";
import AdminLayout from "@/layouts/AdminLayout";
import CategoryList from "@/pages/CategoryList";
import EditCategory from "@/pages/EditCategory";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [{ index: true, element: <UserDashboard /> }],
  },
{
  path: "/admin",
  element: <ProtectedRoute allowedRoles={["admin"]} />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        {
          path: "categories/create",
          element: <CreateCategory />,
        },
                {
          path: "categories/edit/:id",
          element: <EditCategory />,
        },
              {
          path: "categories/manage-categories",
          element: <CategoryList />,
        },
      ],
    },
  ],
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
