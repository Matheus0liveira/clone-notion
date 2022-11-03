import z from 'zod';

export const createNotPadSchema = z.object({
  title: z.string().min(1),
});
