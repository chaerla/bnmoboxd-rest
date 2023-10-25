import { z } from 'zod';
import { RequestSchema } from '@middlewares/validate.middleware';

export const registerSchema: RequestSchema = {
  body: z.object({
    username: z
      .string({ required_error: 'Username cannot be empty' })
      .min(5, { message: 'Username is too short' })
      .max(20, { message: 'Username is too long' }),
    password: z.string({ required_error: 'Password cannot be empty' }).min(6, { message: 'Password must be at least 6 characters' }),
    email: z.string({ required_error: 'Email cannot be empty' }).email({ message: 'Invalid email format' }),
    name: z.string({ required_error: 'Name cannot be empty' }).min(2, { message: 'Name is too short' }).max(255, { message: 'Name is too long' }),
  }),
};
