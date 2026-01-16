import { useQuery } from "@tanstack/react-query";
import { getNotificationByCategory } from "./subscriptions.api";
import type { IMySubscription } from "./subscriptions.types";

export const useMySubscriptions = () => {
  return useQuery<IMySubscription>({
    queryKey: ["my-subscriptions"],
    queryFn: getNotificationByCategory,
  });
};
