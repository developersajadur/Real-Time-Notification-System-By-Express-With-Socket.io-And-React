import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Category name must be at least 3 characters long')
      .max(30, 'Category name cannot exceed 30 characters'),

    description: z
      .string()
      .max(200, 'Description cannot exceed 200 characters')
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
