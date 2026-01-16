import { createBrowserRouter } from "react-router";

import ProtectedRoute from "./ProtectedRoutes";
import PublicAuthRoute from "./PublicAuthRoute";

import AuthLayout from "@/pages/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import UserDashboard from "@/pages/UserDashboard";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";

import CreateCategory from "@/pages/CreateCategory";
import CategoryList from "@/pages/CategoryList";
import EditCategory from "@/pages/EditCategory";

import ManageNotifications from "@/pages/ManageNotifications";
import CreateNotification from "@/pages/CreateNotification";
import EditNotification from "@/pages/EditNotification";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
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
