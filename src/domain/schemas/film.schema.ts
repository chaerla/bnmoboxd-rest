import { RequestSchema } from '@middlewares/validate.middleware';
import { z } from 'zod';
import { paginationSchema } from '@/domain/schemas/index.schema';

export const getFilmsSchema: RequestSchema = {
  query: z.object({
    query: z.string(),
    ...paginationSchema,
  }),
};
