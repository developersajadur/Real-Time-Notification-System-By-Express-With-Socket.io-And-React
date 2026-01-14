"use client"

import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { SidebarHeaders } from "./SidebarHeader"
import { NavUser } from "./NavUser"
import { AdminNav } from "./AdminNav"
import { useMe } from "@/features/auth/useMe"

const data = {
  navMain: [
    {
      title: "Category",
      url: "/admin/categories",
      icon: SquareTerminal,
      items: [
        {
          title: "Create Category",
          url: "/admin/categories/create",
        },
        {
          title: "Manage Categories",
          url: "/admin/categories/manage-categories",
        },
      ],
    },
  ],
};
export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
        const { data: user } = useMe();
  return (
    <Sidebar collapsible="icon" {...props}>
  <SidebarHeaders/>
      <SidebarContent>
        <AdminNav items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
