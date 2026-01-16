import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unsubscribeCategory } from "./subscriptions.api";


export const useUnsubscribeCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: unsubscribeCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-subscriptions"] });
    },
  });
};
