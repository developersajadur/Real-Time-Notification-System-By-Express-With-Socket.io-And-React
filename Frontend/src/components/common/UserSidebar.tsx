import { Bell, Layers } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarHeaders } from "./SidebarHeader";
import { NavUser } from "./NavUser";
import { useMe } from "@/features/auth/useMe";
import { useMySubscriptions } from "@/features/subscriptions/useMySubscriptions";
import { useNavigate } from "react-router";

export function UserSidebar() {
  const navigate = useNavigate();
  const { data: user } = useMe();
  const { data: subs } = useMySubscriptions();

  const categories = subs?.categoryIds ?? [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeaders />

      <SidebarContent>
        <SidebarMenu>

          <SidebarMenuItem className="border-b-2 border-b-blue-500">
            <SidebarMenuButton
              tooltip="All Categories"
              onClick={() => navigate("/dashboard/categories")}
              className="group-data-[collapsible=icon]:justify-center"
            >
              <Layers className="shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                All Categories
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {categories.map((cat) => (
            <SidebarMenuItem key={cat._id}>
              <SidebarMenuButton
                tooltip={cat.name}
                onClick={() =>
                  navigate(`/dashboard/categories/${cat._id}`)
                }
                className="group-data-[collapsible=icon]:justify-center"
              >
                <Bell className="shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {cat.name}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
