import { z } from 'zod';
import { CATEGORY_CREATOR } from './category.constant';

 const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Category name must be at least 3 characters long')
      .max(30, 'Category name cannot exceed 30 characters')
      .regex(/^[A-Z_]+$/, 'Category name must be uppercase and underscore only'),

    description: z
      .string()
      .max(200, 'Description cannot exceed 200 characters')
      .optional(),

    createdBy: z
      .enum([CATEGORY_CREATOR.ADMIN, CATEGORY_CREATOR.SYSTEM])
      .optional(),
  }),
});


 const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Category name must be at least 3 characters long')
      .optional(),

    description: z
      .string()
      .max(200, 'Description cannot exceed 200 characters')
      .optional(),

    isActive: z.boolean().optional(),
  }),
});


export const categoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};