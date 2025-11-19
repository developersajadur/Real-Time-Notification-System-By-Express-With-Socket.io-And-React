import z from 'zod';

const createMember = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    capacity: z.number().min(0).max(5),
    team: z.string().min(1, 'Team ID is required'),
  }),
});

const updateMember = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    capacity: z.number().min(0).max(5).optional(),
    team: z.string().optional(),
  }),
});

export const memberValidationSchema = {
  createMember,
  updateMember,
};
