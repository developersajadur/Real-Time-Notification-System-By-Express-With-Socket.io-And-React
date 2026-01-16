import NotificationForm from "@/components/Notification/NotificationForm";
import { useCreateNotification } from "@/features/notifications/useCreateNotification";
import { useNavigate } from "react-router";

const CreateNotification = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateNotification();

  return (
    <div className="flex justify-center">
      <NotificationForm
        isLoading={isPending}
        onSubmit={(data) =>
          mutate(data, {
            onSuccess: () => navigate("/admin"),
          })
        }
      />
    </div>
  );
};

export default CreateNotification;
