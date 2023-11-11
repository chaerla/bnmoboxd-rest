import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import { getUserVerificationSchema } from '@/domain/schemas/user-verification.schema';

class UserVerificationController implements Controller {
  public path = '/verification';
  public router = Router();
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  getUserVerifications = async (req: Request) => {
    return {
      data: {
        verifications: [
          {
            username: 'user1',
            name: 'Geralt Rivia',
            status: 'PENDING',
          },
          {
            username: 'user2',
            name: 'Ashen One',
            status: 'ACCEPTED',
          },
          {
            username: 'user3',
            name: 'Giorno Giovana',
            status: 'REJECTED',
          },
        ],
        count: 3,
      },
    };
  };

  // getSubscriptions = async (req: Request) => {
  //   // call to soap to get subscriptions
  //   return {
  //     data: {
  //       subscriptions: [
  //         {
  //           curatorUsername: 'Curator 1',
  //           subscriberUsername: 'User 1',
  //           status: 'PENDING',
  //         },
  //         {
  //           curatorUsername: 'Curator 2',
  //           subscriberUsername: 'User 2',
  //           status: 'ACCEPTED',
  //         },
  //         {
  //           curatorUsername: 'Curator 3',
  //           subscriberUsername: 'User 3',
  //           status: 'REJECTED',
  //         },
  //         {
  //           curatorUsername: 'Curator 4',
  //           subscriberUsername: 'User 4',
  //           status: 'REJECTED',
  //         },
  //         {
  //           curatorUsername: 'Curator 5',
  //           subscriberUsername: 'User 5',
  //           status: 'REJECTED',
  //         },
  //         {
  //           curatorUsername: 'Curator 6',
  //           subscriberUsername: 'User 6',
  //           status: 'PENDING',
  //         },
  //         {
  //           curatorUsername: 'Curator 7',
  //           subscriberUsername: 'User 7',
  //           status: 'ACCEPTED',
  //         },
  //         {
  //           curatorUsername: 'Curator 8',
  //           subscriberUsername: 'User 8',
  //           status: 'PENDING',
  //         },
  //       ],
  //       count: 8,
  //     },
  //   };
  // };
  // putSubscription = async (req: Request) => {
  //   console.log(req);
  //   // call to soap to update subs status
  //   return {
  //     data: {
  //       curatorUsername: 'Curator 8',
  //       subscriberUsername: 'User 8',
  //       status: 'PENDING',
  //     },
  //   };
  // };
  // private initializeRoutes() {
  //   this.router.get(`${this.path}`, [this.authMiddleware.verifyAdmin, validateRequest(getSubscriptionsSchema)], handleRequest(this.getSubscriptions));
  //   this.router.put(`${this.path}`, [this.authMiddleware.verifyAdmin, validateRequest(putSubscriptionsSchema)], handleRequest(this.putSubscription));
  // }
  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      [this.authMiddleware.verifyAdmin, validateRequest(getUserVerificationSchema)],
      handleRequest(this.getUserVerifications),
    );
  }
}

export default UserVerificationController;
