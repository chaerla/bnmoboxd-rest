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

const FileSchema = z.object({
  buffer: z.instanceof(Buffer),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  size: z.number(),
  fieldname: z.string(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
});

export const postProfileImageSchema = {
  file: FileSchema,
};

export const putProfileSchema = {
  body: z.object({
    firstName: z
      .string({ required_error: 'First name cannot be empty' })
      .min(2, { message: 'First name should be longer than 2 characters' })
      .max(255, { message: 'Name should not be longer than 255 characters' }),
    lastName: z.string().optional(),
    bio: z.string().max(255, { message: 'Bio should not be longer than 255 characters' }),
  }),
};
