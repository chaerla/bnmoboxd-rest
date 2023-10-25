import { NextFunction, Request, Response } from 'express';
import ApplicationError from '@errors/application.error';

// @ts-ignore
export const errorMiddleware = (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const { status, message, fieldErrors } = err;
  res.status(status).json({ message, fieldErrors });
};
