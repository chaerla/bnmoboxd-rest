import { Request, Router } from 'express';
import UserRepository from '@/repositories/user.repository';
import UserService from '@/services/user.service';
import Controller from '@interfaces/controller';
import { registerSchema } from '@/domain/schemas/register.schema';
import { validateRequest } from '@middlewares/validate.middleware';
import { handleRequest } from '@utils/handle-request';
import { BaseResponse } from '@interfaces/base-response';
import { loginSchema } from '@/domain/schemas/login.schema';

class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private userService: UserService;
  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
    this.initializeRoutes();
  }

  register = async (req: Request): Promise<BaseResponse> => {
    return { data: await this.userService.register(req.body) };
  };

  login = async (req: Request): Promise<BaseResponse> => {
    return { data: await this.userService.login(req.body) };
  };

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validateRequest(registerSchema), handleRequest(this.register));
    this.router.post(`${this.path}/login`, validateRequest(loginSchema), handleRequest(this.login));
  }
}

export default AuthController;
