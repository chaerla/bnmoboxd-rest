import { Request, Router } from 'express';
import UserRepository from '@/repositories/user.repository';
import UserService from '@/services/user.service';
import Controller from '@interfaces/controller';
import { handleRequest } from '@utils/handle-request';
import { BaseResponse } from '@interfaces/base-response';
import { AuthMiddleware } from '@middlewares/auth.middleware';

class EmailController implements Controller {
  public path = '/email';
  public router = Router();
  private userService: UserService;
  private authMiddleware: AuthMiddleware;
  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  getAdminEmail = async (req: Request): Promise<BaseResponse> => {
    const admin = await this.userService.findUserByUsername('admin');
    return { data: admin.email };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}/admin`, [this.authMiddleware.validateApiKey], handleRequest(this.getAdminEmail));
  }
}

export default EmailController;
