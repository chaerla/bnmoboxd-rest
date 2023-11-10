import Controller from '@interfaces/controller';
import { Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import CuratorService from '@/services/curator.service';
import UserRepository from '@/repositories/user.repository';
import { getCuratorsSchema } from '@/domain/schemas/curator.schema';

class CuratorController implements Controller {
  public path = '/curator';
  public router = Router();
  private curatorService: CuratorService;
  private authMiddleware: AuthMiddleware;
  constructor() {
    const userRepository = new UserRepository();
    this.authMiddleware = new AuthMiddleware();
    this.curatorService = new CuratorService(userRepository);
    this.initializeRoutes();
  }

  getCurators = async (req: Request) => {
    const data = await this.curatorService.getCurators(req.body);
    return { data };
  };
  private initializeRoutes() {
    this.router.get(`${this.path}/`, [this.authMiddleware.validatePhp], validateRequest(getCuratorsSchema), handleRequest(this.getCurators));
  }
}

export default CuratorController;
