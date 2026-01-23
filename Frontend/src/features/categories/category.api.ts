/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/lib/axios";
import { type CreateCategoryPayload, type ICategory, type UpdateCategoryPayload } from "./category.types";



export const getAllCategories = async (
  page?: number,
  limit?: number,
  search?: string
): Promise<{ data: ICategory[]; meta: any }> => {
  const res = await axios.get("/categories/get-all", {
    params: { page, limit, search },
  });
  return res.data;
};

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<ICategory> => {
  const res = await axios.post("/categories/create", payload);
  return res.data.data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryPayload
): Promise<ICategory> => {
  const res = await axios.patch(`/categories/update/${id}`, payload);
  return res.data.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`/categories/delete/${id}`);
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const res = await axios.get(`/categories/get/${id}`);
  return res.data.data;
};