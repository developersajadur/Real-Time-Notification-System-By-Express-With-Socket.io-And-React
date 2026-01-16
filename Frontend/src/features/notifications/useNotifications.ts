/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "./notification.api";
import type { PaginatedNotifications } from "./notification.types";

export const useNotifications = (page: number, limit = 10) => {
  return useQuery<PaginatedNotifications>({
    queryKey: ["notifications", page, limit],
    queryFn: () => getNotifications(page, limit),
    keepPreviousData: true,
  } as any);
};