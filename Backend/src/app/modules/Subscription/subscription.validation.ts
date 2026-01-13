// subscription.validation.ts
import { z } from 'zod';

const subscribeCategorySchema = z.object({
  body: z.object({
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),
  }),
});

const unsubscribeCategorySchema = z.object({
  body: z.object({
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),
  }),
});

export const subscriptionValidation = {
  subscribeCategorySchema,
  unsubscribeCategorySchema,
};
