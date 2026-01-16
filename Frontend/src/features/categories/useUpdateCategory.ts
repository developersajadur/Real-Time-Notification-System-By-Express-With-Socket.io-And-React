/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "./category.api";
import { toast } from "sonner";

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => updateCategory(id, payload),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update category"
      );
    },
  });
};
