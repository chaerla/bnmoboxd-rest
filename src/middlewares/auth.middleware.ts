import { NextFunction, Request, Response } from 'express';
import Unauthorized from '@errors/unauthorized.error';
import jwt from 'jsonwebtoken';
import { PHP_API_KEY, SECRET_KEY, SOAP_API_KEY } from '@config';
import { User } from '@prisma/client';
import UserService from '@/services/user.service';
import UserRepository from '@/repositories/user.repository';
import Forbidden from '@errors/forbidden.error';

export type RequestWithUser = Request & {
  user: User;
};

export class AuthMiddleware {
  private userService: UserService;
  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  private getToken(req: RequestWithUser) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
      throw new Unauthorized();
    }

    const bearer = bearerHeader.split(' ');

    if (bearer.length != 2 || bearer[0] != 'Bearer') {
      throw new Unauthorized();
    }
    return bearer[1];
  }

  // @ts-ignore
  verifyUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token = this.getToken(req);
      const decoded = await jwt.verify(token, SECRET_KEY);
      if (!decoded.user) {
        throw new Unauthorized();
      }
      const user = await this.userService.findUserByUsername(decoded.user.username);
      req.user = user;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') next(new Unauthorized('Token is expired'));
      next(err);
    }
  };
  // @ts-ignore
  verifyAdmin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token = this.getToken(req);
      const decoded = await jwt.verify(token, SECRET_KEY);
      if (!decoded.user) {
        throw new Unauthorized();
      }
      const user = await this.userService.findUserByUsername(decoded.user.username);
      if (!user.isAdmin) {
        throw new Forbidden();
      }
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') next(new Unauthorized('Token is expired'));
      next(err);
    }
  };
  validateApiKey = (req: Request) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      throw new Unauthorized();
    }
    return apiKey;
  };

  validateSoap = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiKey = this.validateApiKey(req);
      if (apiKey != SOAP_API_KEY) {
        throw new Unauthorized();
      }
      next();
    } catch (err) {
      next(err);
    }
  };

  validatePhp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiKey = this.validateApiKey(req);
      if (apiKey != PHP_API_KEY) {
        throw new Unauthorized();
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
