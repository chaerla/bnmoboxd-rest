import { RequestSchema } from '@middlewares/validate.middleware';
import { paginationSchema } from '@/domain/schemas/index.schema';

export const getCuratorsSchema: RequestSchema = {
  query: paginationSchema,
};
