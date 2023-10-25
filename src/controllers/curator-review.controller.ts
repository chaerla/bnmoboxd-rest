import { Router } from 'express';
import Controller from '@interfaces/controller';
import { handleRequest } from '@utils/handle-request';
import { authMiddleware } from '@middlewares/auth.middleware';

class CuratorReviewController implements Controller {
  public path = '/curator-review';
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  protectedRoute = async () => {
    return { data: 'this is a protected route' };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}/protected`, authMiddleware, handleRequest(this.protectedRoute));
  }
}

export default CuratorReviewController;
