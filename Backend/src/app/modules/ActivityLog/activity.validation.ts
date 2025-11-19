import z from 'zod';

const listActivity = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : 1)),
    limit: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : 10)),
    // possible filters
    taskId: z.string().optional(),
    fromMember: z.string().optional(),
    toMember: z.string().optional(),
  }),
});

export const activityValidation = {
  listActivity,
};
