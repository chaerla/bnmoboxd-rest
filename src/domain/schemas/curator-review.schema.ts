import { RequestSchema } from '@middlewares/validate.middleware';
import { z } from 'zod';
import { paginationSchema } from '@/domain/schemas/index.schema';

export const getCuratorReviewSchema: RequestSchema = {
  params: z.object({
    id: z.string().transform(id => parseInt(id)),
  }),
};

export const postCuratorReviewSchema: RequestSchema = {
  body: z.object({
    rating: z.number(),
    review: z.string(),
    filmId: z.number(),
  }),
};

export const putCuratorReviewSchema: RequestSchema = {
  body: z.object({
    rating: z.number().optional(),
    review: z.string().optional(),
    filmId: z.number().optional(),
  }),
  params: z.object({
    id: z.string().transform(id => parseInt(id)),
  }),
};

export const getCuratorReviewsSchema: RequestSchema = {
  query: paginationSchema,
};

export const deleteCuratorReviewSchema: RequestSchema = getCuratorReviewSchema;
