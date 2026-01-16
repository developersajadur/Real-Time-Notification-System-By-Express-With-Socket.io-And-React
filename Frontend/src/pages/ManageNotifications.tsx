import NotificationList from "@/components/Notification/NotificationList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const ManageNotifications = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Notifications
        </h2>

        <Button onClick={() => navigate("/admin/notifications/create")}>
          Create Notification
        </Button>
      </div>

      <NotificationList />
    </div>
  );
};

export default ManageNotifications;
