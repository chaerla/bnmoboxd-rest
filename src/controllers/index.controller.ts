import { Router } from 'express';
import Controller from '@interfaces/controller';
import { handleRequest } from '@utils/handle-request';

class IndexController implements Controller {
  public path = '/';
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  hello = async () => {
    return { data: '🚀 BNMOXD REST API 🚀' };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}`, handleRequest(this.hello));
  }
}
export default IndexController;
