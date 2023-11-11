import { z } from 'zod';

export const paginationSchema = {
  page: z
    .string()
    .transform(page => parseInt(page))
    .optional(),
  take: z
    .string()
    .transform(take => parseInt(take))
    .optional(),
};
