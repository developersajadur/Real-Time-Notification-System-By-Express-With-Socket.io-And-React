import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotification } from "./notification.api";
import { toast } from "sonner";

export const useUpdateNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      toast.success("Notification updated");
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
