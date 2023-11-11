import { RequestSchema } from '@middlewares/validate.middleware';
import { paginationSchema } from '@/domain/schemas/index.schema';
import { z } from 'zod';

export const getUserVerificationSchema: RequestSchema = {
  query: z.object({ ...paginationSchema }),
};

export const putUserVerificationSchema: RequestSchema = {
  params: z.object({
    id: z.string().transform(id => parseInt(id)),
  }),
};
