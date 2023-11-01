import { RequestSchema } from '@middlewares/validate.middleware';
import { z } from 'zod';

export const getFilmsSchema: RequestSchema = {
  query: z.object({
    query: z.string(),
    page: z.string().transform(page => parseInt(page)),
    take: z.string().transform(take => parseInt(take)),
  }),
};
