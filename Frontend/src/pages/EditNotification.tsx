import { useParams, useNavigate } from "react-router";
import NotificationForm from "@/components/Notification/NotificationForm";
import { useUpdateNotification } from "@/features/notifications/useUpdateNotification";
import { useNotification } from "@/features/notifications/useNotification";

const EditNotification = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: notification, isLoading } = useNotification(id!);
  const { mutate, isPending } = useUpdateNotification();

  if (isLoading) return null;
  if (!notification) return null;

  return (
    <div className="flex justify-center">
      <NotificationForm
        mode="edit"
        isLoading={isPending}
        defaultValues={{
          title: notification.title,
          message: notification.message,
          categoryId: notification.categoryId._id,
        }}
        onSubmit={(data) =>
          mutate(
            { id: notification._id, payload: data },
            { onSuccess: () => navigate("/admin/notifications") }
          )
        }
      />
    </div>
  );
};

export default EditNotification;
