import { z } from 'zod';
import { RequestSchema } from '@middlewares/validate.middleware';

export const loginSchema: RequestSchema = {
  body: z.object({
    username: z.string({ required_error: 'Username cannot be empty' }),
    password: z.string({ required_error: 'Password cannot be empty' }),
  }),
};
