
import { Outlet } from "react-router";
import { UserSidebar } from "@/components/common/UserSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { queryClient } from "@/lib/react-query";

export default function UserLayout() {
    /* 🔌 SOCKET LISTENER (GLOBAL for USER) */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewNotification = () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-by-category"],
      });
    };

    socket.on("new-notification", handleNewNotification);

    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, []);
  return (
    <SidebarProvider>
      <UserSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger id="sidebarTrigger" />
          <Separator orientation="vertical" className="h-4" />
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
