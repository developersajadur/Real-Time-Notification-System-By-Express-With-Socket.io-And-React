import { useQuery } from "@tanstack/react-query";
import type { IUserNotification } from "./notification.types";
import { getMyNotificationsByCategory } from "./notification.api";

export const useNotificationsByCategory = (categoryId: string) => {
  return useQuery<IUserNotification[]>({
    queryKey: ["my-notifications", categoryId],
    queryFn: () => getMyNotificationsByCategory(categoryId),
    enabled: !!categoryId,
  });
};
