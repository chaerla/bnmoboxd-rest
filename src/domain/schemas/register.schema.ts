import { z } from 'zod';
import { RequestSchema } from '@middlewares/validate.middleware';

export const registerSchema: RequestSchema = {
  body: z.object({
    username: z
      .string({ required_error: 'Username cannot be empty' })
      .min(5, { message: 'Username should not be shorter than 5 characters' })
      .max(16, { message: 'Username should not be longer than 16 characters' }),
    password: z.string({ required_error: 'Password cannot be empty' }).min(6, { message: 'Password must be at least 6 characters' }),
    email: z.string({ required_error: 'Email cannot be empty' }).email({ message: 'Invalid email format' }),
    firstName: z
      .string({ required_error: 'First name cannot be empty' })
      .min(2, { message: 'First name should be longer than 2 characters' })
      .max(255, { message: 'Name is too long' }),
    lastName: z.string().optional(),
  }),
};
