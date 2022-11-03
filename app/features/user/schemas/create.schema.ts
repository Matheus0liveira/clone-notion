import z from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(4),
});
