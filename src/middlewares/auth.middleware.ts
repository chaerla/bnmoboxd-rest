import { NextFunction, Request, Response } from 'express';
import Unauthorized from '@errors/unauthorized.error';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { User } from '@prisma/client';

export type RequestWithUser = Request & {
  user: User;
};

// @ts-ignore
export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return next(new Unauthorized());
  }

  const bearer = bearerHeader.split(' ');

  if (bearer.length != 2 || bearer[0] != 'Bearer') {
    return next(new Unauthorized());
  }

  const token = bearer[1];

  await jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err || !decoded.user) {
      if (err.name === 'TokenExpiredError') return next(new Unauthorized('Token expired'));
      return next(new Unauthorized());
    }
    req.user = decoded.user;
  });
  next();
};
