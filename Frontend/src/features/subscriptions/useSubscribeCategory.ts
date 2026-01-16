
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribeCategory } from "./subscriptions.api";


export const useSubscribeCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: subscribeCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-subscriptions"] });
    },
  });
};
