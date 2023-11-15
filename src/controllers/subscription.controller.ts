import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { AuthMiddleware, RequestWithUser } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import { getSubscriptionsSchema, putSubscriptionsSchema } from '@/domain/schemas/subscription.schema';
import SubscriptionService from '@/services/subscription.service';
import SoapApi from '@/clients/soap-api';

class SubscriptionController implements Controller {
  public path = '/subscription';
  public router = Router();
  private authMiddleware: AuthMiddleware;
  private subscriptionService: SubscriptionService;
  constructor() {
    const soapApi = new SoapApi();
    this.authMiddleware = new AuthMiddleware();
    this.subscriptionService = new SubscriptionService(soapApi);
    this.initializeRoutes();
  }

  getSubscriptions = async (req: Request) => {
    const data = await this.subscriptionService.getSubscriptions(req.query);
    return { data };
  };
  putSubscription = async (req: Request) => {
    await this.subscriptionService.putSubscription(req.body);
    return { message: 'Subscription status updated successfully' };
  };

  getCount = async (req: RequestWithUser) => {
    const count = await this.subscriptionService.getSubscriptionCount(req.user.username);
    return { data: { count } };
  };
  private initializeRoutes() {
    this.router.get(`${this.path}`, [this.authMiddleware.verifyAdmin, validateRequest(getSubscriptionsSchema)], handleRequest(this.getSubscriptions));
    this.router.put(`${this.path}`, [this.authMiddleware.verifyAdmin, validateRequest(putSubscriptionsSchema)], handleRequest(this.putSubscription));
    this.router.get(`${this.path}/count`, [this.authMiddleware.verifyUser], handleRequest(this.getCount));
  }
}

export default SubscriptionController;
