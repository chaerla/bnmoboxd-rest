import { RequestSchema } from '@middlewares/validate.middleware';
import { paginationSchema } from '@/domain/schemas/index.schema';
import { z } from 'zod';

export const getCuratorsSchema: RequestSchema = {
  query: z.object({ ...paginationSchema }),
};

export const getCuratorDetailsSchema: RequestSchema = {
  params: z.object({
    username: z.string(),
  }),
  query: z.object({
    ...paginationSchema,
    reviews: z.enum(['true', 'false']).optional(),
  }),
};
