import Controller from '@interfaces/controller';
import CuratorReviewService from '@/services/curator-review.service';
import { Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { authMiddleware, RequestWithUser } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import {
  deleteCuratorReviewSchema,
  getCuratorReviewSchema,
  getCuratorReviewsSchema,
  postCuratorReviewSchema,
  putCuratorReviewSchema,
} from '@/domain/schemas/curator-review.schema';
import CuratorReviewRepository from '@/repositories/curator-review.repository';
import { StatusCodes } from 'http-status-codes';
import PhpApi from '@/adapters/php-api';

class CuratorReviewController implements Controller {
  public path = '/curator-review';
  public router = Router();
  private curatorReviewService: CuratorReviewService;
  constructor() {
    const curatorReviewRepository = new CuratorReviewRepository();
    const phpApi = new PhpApi();
    this.curatorReviewService = new CuratorReviewService(curatorReviewRepository, phpApi);
    this.initializeRoutes();
  }

  protectedRoute = async () => {
    return { data: 'this is a protected route' };
  };

  getReview = async (req: RequestWithUser) => {
    const data = await this.curatorReviewService.getReview(req.params.id, req.user.id);
    return { data };
  };

  getReviews = async (req: RequestWithUser) => {
    const data = await this.curatorReviewService.getReviews(req.user.id, req.query);
    return { data };
  };

  postReview = async (req: RequestWithUser) => {
    const data = await this.curatorReviewService.createReview(req.body, req.user.id);
    return { status: StatusCodes.CREATED, message: `Review successfully created!`, data };
  };

  putReview = async (req: RequestWithUser) => {
    const data = await this.curatorReviewService.updateReview(req.params.id, req.body, req.user.id);
    return { message: `Review with ID ${req.params.id} is successfully updated!`, data };
  };

  deleteReview = async (req: RequestWithUser) => {
    const data = await this.curatorReviewService.deleteReview(req.params.id, req.user.id);
    return { message: `Review with ID ${req.params.id} is successfully deleted!`, data };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, [authMiddleware, validateRequest(getCuratorReviewSchema)], handleRequest(this.getReview));
    this.router.get(`${this.path}/`, [authMiddleware], validateRequest(getCuratorReviewsSchema), handleRequest(this.getReviews));
    this.router.post(`${this.path}`, [authMiddleware, validateRequest(postCuratorReviewSchema)], handleRequest(this.postReview));
    this.router.put(`${this.path}/:id`, [authMiddleware, validateRequest(putCuratorReviewSchema)], handleRequest(this.putReview));
    this.router.delete(`${this.path}/:id`, [authMiddleware, validateRequest(deleteCuratorReviewSchema)], handleRequest(this.deleteReview));
    this.router.get(`${this.path}/protected`, [authMiddleware], handleRequest(this.protectedRoute));
  }
}

export default CuratorReviewController;
