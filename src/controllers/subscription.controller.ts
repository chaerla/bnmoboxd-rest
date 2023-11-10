import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import SoapApi from '@/adapters/soap-api';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import { getSubscriptionsSchema, putSubscriptionsSchema } from '@/domain/schemas/subscription.schema';

class SubscriptionController implements Controller {
  public path = '/subscription';
  public router = Router();
  private authMiddleware: AuthMiddleware;
  private soapApi: SoapApi;
  constructor() {
    this.soapApi = new SoapApi();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  getSubscriptions = async (req: Request) => {
    // call to soap to get subscriptions
    return {
      data: {
        subscriptions: [
          {
            curatorUsername: 'Curator 1',
            subscriberUsername: 'User 1',
            status: 'PENDING',
          },
          {
            curatorUsername: 'Curator 2',
            subscriberUsername: 'User 2',
            status: 'ACCEPTED',
          },
          {
            curatorUsername: 'Curator 3',
            subscriberUsername: 'User 3',
            status: 'REJECTED',
          },
          {
            curatorUsername: 'Curator 4',
            subscriberUsername: 'User 4',
            status: 'REJECTED',
          },
          {
            curatorUsername: 'Curator 5',
            subscriberUsername: 'User 5',
            status: 'REJECTED',
          },
          {
            curatorUsername: 'Curator 6',
            subscriberUsername: 'User 6',
            status: 'PENDING',
          },
          {
            curatorUsername: 'Curator 7',
            subscriberUsername: 'User 7',
            status: 'ACCEPTED',
          },
          {
            curatorUsername: 'Curator 8',
            subscriberUsername: 'User 8',
            status: 'PENDING',
          },
        ],
        count: 8,
      },
    };
  };
  putSubscription = async (req: Request) => {
    console.log(req);
    // call to soap to update subs status
    return {
      data: {
        curatorUsername: 'Curator 8',
        subscriberUsername: 'User 8',
        status: 'PENDING',
      },
    };
  };
  private initializeRoutes() {
    this.router.get(`${this.path}`, [this.authMiddleware.verifyAdmin, validateRequest(getSubscriptionsSchema)], handleRequest(this.getSubscriptions));
    this.router.put(`${this.path}`, [this.authMiddleware.verifyAdmin, validateRequest(putSubscriptionsSchema)], handleRequest(this.putSubscription));
  }
}

export default SubscriptionController;
