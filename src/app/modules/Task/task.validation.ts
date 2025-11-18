import z from 'zod';

const createTask = z.object({
  body: z.object({
    project: z.string().min(1, 'Project ID is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    assignedTo: z.string().optional(),
    priority: z.enum(['Low', 'Medium', 'High']).optional(),
    status: z.enum(['Pending', 'In Progress', 'Done']).optional(),
  }),
});

const updateTask = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    assignedTo: z.string().optional(),
    priority: z.enum(['Low', 'Medium', 'High']).optional(),
    status: z.enum(['Pending', 'In Progress', 'Done']).optional(),
  }),
});

export const taskValidationSchema = {
  createTask,
  updateTask,
};
