/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import QueryBuilder from '../../builders/QueryBuilder';

const createCategory = async (
  payload: Partial<ICategory>,
): Promise<ICategory> => {
  const category = Category.create(payload);
  return category;
};

const getAllCategoryByQuery = async (query: Record<string, any>) => {
  const modelQuery = Category.find();

  const categorySearchableFields = ['name'];

  const categoryQueryBuilder = new QueryBuilder<ICategory>(modelQuery, query)
    .search(categorySearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await categoryQueryBuilder.modelQuery;
  const meta = await categoryQueryBuilder.countTotal();

  return {
    meta,
    data: result,
  };
};

const getCategoryById = async (
  categoryId: string,
): Promise<ICategory | null> => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError(status.NOT_FOUND, 'Category not found');
  }
  return category;
};

const updateCategory = async (
  categoryId: string,
  payload: Partial<ICategory>,
): Promise<ICategory | null> => {
  const category = await Category.findByIdAndUpdate(categoryId, payload, {
    new: true,
  });
  return category;
};

const deleteCategory = async (categoryId: string): Promise<null> => {
  await Category.findByIdAndDelete(categoryId);
  return null;
};

export const categoryService = {
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
  getAllCategoryByQuery,
};
