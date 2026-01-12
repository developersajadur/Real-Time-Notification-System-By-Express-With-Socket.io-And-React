
import { z } from 'zod';

export const updateSubscriptionSchema = z.object({
  body: z.object({
    categoryIds: z
      .array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID')
      )
      .min(1, 'At least one category must be selected'),
  }),
});

export const subscriptionValidation = {
  updateSubscriptionSchema,
};