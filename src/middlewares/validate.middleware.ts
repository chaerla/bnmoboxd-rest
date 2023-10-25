import { AnyZodObject } from 'zod';
import { NextFunction, Request } from 'express';
import BadRequest from '@errors/bad-request.error';

export interface RequestSchema {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export const validate = (schema: AnyZodObject, data: any) => {
  const result = schema.safeParse({ ...data });
  if (!result.success) {
    // @ts-ignore
    throw new BadRequest('Validation Error', result.error.flatten());
  }
};

export const validateRequest = ({ params, body, query }: RequestSchema) => {
  // @ts-ignore
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (params) {
        validate(params, req.params);
      }
      if (body) {
        validate(body, req.body);
      }
      if (query) {
        validate(query, req.query);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
