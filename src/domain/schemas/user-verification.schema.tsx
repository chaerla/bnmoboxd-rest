import { RequestSchema } from '@middlewares/validate.middleware';
import { paginationSchema } from '@/domain/schemas/index.schema';

export const getUserVerificationSchema: RequestSchema = {
  query: paginationSchema,
};
