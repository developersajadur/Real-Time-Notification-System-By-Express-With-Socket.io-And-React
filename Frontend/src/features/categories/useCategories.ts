/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "./category.api";



export const useCategories = (
  page: number,
  limit: number,
  search: string
) => {
  return useQuery({
    queryKey: ["categories", page, search],
    queryFn: () => getAllCategories(page, limit, search),
    keepPreviousData: true,
  } as any);
};