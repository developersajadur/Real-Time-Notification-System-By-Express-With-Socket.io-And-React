import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useNotificationsByCategory } from "@/features/notifications/useNotificationsByCategory";
import { useCategory } from "@/features/categories/useCategory";
import { useUnsubscribeCategory } from "@/features/subscriptions/useUnsubscribeCategory";

const UserCategoryNotifications = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data = [], isLoading } = useNotificationsByCategory(id!);
  const { data: category } = useCategory(id!);
  const { mutate: unsubscribe, isPending } =
    useUnsubscribeCategory();

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-b-black px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            {category?.name || "Category"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {category?.description}
          </p>
        </div>

        <Button
          variant="destructive"
          size="sm"
          disabled={isPending}
          onClick={() =>
            unsubscribe(id!, {
              onSuccess: () => navigate("/dashboard/categories"),
            })
          }
        >
          Unsubscribe
        </Button>
      </div>

      {/* Notifications */}
      {data.map((item) => {
        const n = item.notificationId;

        return (
          <div
            key={item._id}
            className={`border-b px-6 py-4 transition-colors hover:bg-muted/40 ${
              !item.isRead ? "bg-muted/20" : ""
            }`}
          >
            <div className="flex justify-between">
              <h4 className="font-medium">{n.title}</h4>
              <span className="text-xs text-muted-foreground">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {n.message}
            </p>
          </div>
        );
      })}

      {data.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">
          No notifications found
        </div>
      )}
    </div>
  );
};

export default UserCategoryNotifications;
