// useCreateNotification.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotification } from "./notification.api";
import { toast } from "sonner";

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      toast.success("Notification created successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
