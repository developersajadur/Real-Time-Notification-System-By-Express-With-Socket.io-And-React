import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategoryById } from "./category.api";
import type { ICategory } from "./category.types";


export const CATEGORY_KEYS = {
  all: ["categories"] as const,
  lists: () => [...CATEGORY_KEYS.all, "list"] as const,
  details: () => [...CATEGORY_KEYS.all, "detail"] as const,
};

export const useCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: [CATEGORY_KEYS.lists()],
    queryFn: getAllCategories,
  });
};


export const useCategory = (id: string) => {
  return useQuery<ICategory>({
    queryKey: [CATEGORY_KEYS.details(), id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
