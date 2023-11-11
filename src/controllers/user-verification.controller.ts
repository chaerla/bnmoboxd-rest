import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import UserVerificationService from '@/services/user-verification.service';
import UserVerificationRepository from '@/repositories/user-verification.repository';
import { getUserVerificationSchema, putUserVerificationSchema } from '@/domain/schemas/user-verification.schema';

class UserVerificationController implements Controller {
  public path = '/verification';
  public router = Router();
  private authMiddleware: AuthMiddleware;
  private userVerificationService: UserVerificationService;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    const userVerificationRepository = new UserVerificationRepository();
    this.userVerificationService = new UserVerificationService(userVerificationRepository);
    this.initializeRoutes();
  }

  getUserVerifications = async (req: Request) => {
    const data = await this.userVerificationService.getUserVerifications(req.query);
    return { data };
  };

  verify = async (req: Request) => {
    await this.userVerificationService.updateUserVerification(req.params.id, 'ACCEPTED');
    return { message: `User ${req.params.id} successfully verified` };
  };

  reject = async (req: Request) => {
    await this.userVerificationService.updateUserVerification(req.params.id, 'REJECTED');
    return { message: `User ${req.params.id} rejected` };
  };
  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      [this.authMiddleware.verifyAdmin, validateRequest(getUserVerificationSchema)],
      handleRequest(this.getUserVerifications),
    );
    this.router.put(
      `${this.path}/:id/verify`,
      [this.authMiddleware.verifyAdmin, validateRequest(putUserVerificationSchema)],
      handleRequest(this.verify),
    );
    this.router.put(
      `${this.path}/:id/reject`,
      [this.authMiddleware.verifyAdmin, validateRequest(putUserVerificationSchema)],
      handleRequest(this.reject),
    );
  }
}

export default UserVerificationController;
