import { createBrowserRouter } from "react-router";

import PublicAuthRoute from "./PublicAuthRoute";

import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";

import CreateCategory from "@/pages/CreateCategory";
import CategoryList from "@/pages/CategoryList";
import EditCategory from "@/pages/EditCategory";

import ManageNotifications from "@/pages/ManageNotifications";
import CreateNotification from "@/pages/CreateNotification";
import EditNotification from "@/pages/EditNotification";
import UserLayout from "@/layouts/UserLayout";
import UserCategoryNotifications from "@/pages/UserCategoryNotifications";
import UserDashboardHome from "@/pages/UserDashboardHome";
import CategoryBrowse from "@/pages/CategoryBrowse";
import ProtectedRoute from "./protectedRoutes";

const router = createBrowserRouter([
{
  element: <ProtectedRoute allowedRoles={["user"]} />,
  children: [
    {
      element: <UserLayout />,
      children: [
        { path: "/dashboard", element: <UserDashboardHome /> },
        {
          path: "/dashboard/categories/:id",
          element: <UserCategoryNotifications />,
        },
        {
  path: "/dashboard/categories",
  element: <CategoryBrowse />,
}
      ],
    },
  ],
},

  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },

          { path: "categories", element: <CategoryList /> },
          { path: "categories/create", element: <CreateCategory /> },
          { path: "categories/edit/:id", element: <EditCategory /> },


          { path: "notifications", element: <ManageNotifications /> },
          {
            path: "notifications/create",
            element: <CreateNotification />,
          },
          {
            path: "notifications/edit/:id",
            element: <EditNotification />,
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
