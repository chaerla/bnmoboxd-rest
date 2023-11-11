import { RequestSchema } from '@middlewares/validate.middleware';
import { z } from 'zod';
import { paginationSchema } from '@/domain/schemas/index.schema';

export const getSubscriptionsSchema: RequestSchema = {
  query: z.object({ ...paginationSchema }),
};

export const putSubscriptionsSchema: RequestSchema = {
  body: z.object({
    curatorUsername: z.string({ required_error: 'Curator username is required' }),
    subscriberUsername: z.string({ required_error: 'Subscriber username is required' }),
    status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
  }),
};
