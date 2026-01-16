/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./category.api";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete category"
      );
    },
  });
};
