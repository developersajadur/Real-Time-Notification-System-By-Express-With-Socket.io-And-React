import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategoryById } from "./category.api";
import type { ICategory } from "./category.types";



export const useCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};


export const useCategory = (id: string) => {
  return useQuery<ICategory>({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
