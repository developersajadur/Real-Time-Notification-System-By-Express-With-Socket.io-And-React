import z from 'zod';

const createProject = z.object({
  body: z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    team: z.string().min(1, 'Team ID is required'),
  }),
});

const updateProject = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const projectValidationSchema = {
  createProject,
  updateProject,
};
