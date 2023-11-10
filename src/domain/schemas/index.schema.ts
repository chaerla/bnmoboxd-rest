import { z } from 'zod';

export const paginationSchema = z.object({
  page: z
    .string()
    .transform(page => parseInt(page))
    .optional(),
  take: z
    .string()
    .transform(take => parseInt(take))
    .optional(),
});
