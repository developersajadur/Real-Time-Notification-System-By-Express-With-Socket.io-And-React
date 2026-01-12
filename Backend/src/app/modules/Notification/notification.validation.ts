import { z } from 'zod';

 const createNotificationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(100, 'Title cannot exceed 100 characters'),

    message: z
      .string()
      .min(10, 'Message must be at least 10 characters long')
      .max(1000, 'Message cannot exceed 1000 characters'),

    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),
  }),
});

 const updateNotificationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(100, 'Title cannot exceed 100 characters')
      .optional(),

    message: z
      .string()
      .min(10, 'Message must be at least 10 characters long')
      .max(1000, 'Message cannot exceed 1000 characters')
      .optional(),

    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format')
      .optional(),
  }),
});

export const notificationValidation = {
  createNotificationSchema,
  updateNotificationSchema,
};


