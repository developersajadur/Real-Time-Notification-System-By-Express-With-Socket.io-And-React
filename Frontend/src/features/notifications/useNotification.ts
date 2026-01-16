import { useQuery } from "@tanstack/react-query";
import type { INotification } from "./notification.types";
import { getNotificationById } from "./notification.api";

export const useNotification = (id?: string) => {
  return useQuery<INotification>({
    queryKey: ["notification", id],
    queryFn: () => getNotificationById(id!),
    enabled: !!id,
  });
};
