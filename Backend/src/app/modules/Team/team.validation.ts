import z from 'zod';

const createTeam = z.object({
  body: z.object({
    name: z.string().min(1, 'Team name is required'),
  }),
});

const updateTeam = z.object({
  body: z.object({
    name: z.string().min(1, 'Team name is required'),
  }),
});

export const teamValidationSchema = {
  createTeam,
  updateTeam,
};
