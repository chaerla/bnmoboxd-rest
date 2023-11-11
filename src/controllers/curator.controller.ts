import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import CuratorService from '@/services/curator.service';
import UserRepository from '@/repositories/user.repository';
import { getCuratorDetailsSchema, getCuratorsSchema } from '@/domain/schemas/curator.schema';

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
    const data = await this.curatorService.getCurators(req.query);
    return { data };
  };

  getCuratorDetails = async (req: Request) => {
    const data = await this.curatorService.getCuratorDetails(req.params.username, req.query);
    return { data };
  };
  private initializeRoutes() {
    this.router.get(`${this.path}/`, [this.authMiddleware.validateApiKey], validateRequest(getCuratorsSchema), handleRequest(this.getCurators));
    this.router.get(
      `${this.path}/:username`,
      [this.authMiddleware.validateApiKey],
      validateRequest(getCuratorDetailsSchema),
      handleRequest(this.getCuratorDetails),
    );
  }
}

export default CuratorController;
