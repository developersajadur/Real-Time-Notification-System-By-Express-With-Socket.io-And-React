
import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "./category.api";


export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
