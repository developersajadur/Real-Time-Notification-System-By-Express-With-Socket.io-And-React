// useDeleteNotification.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "./notification.api";
import { toast } from "sonner";

export const useDeleteNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      toast.success("Notification deleted");
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
