import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { AuthMiddleware, RequestWithUser } from '@middlewares/auth.middleware';
import { validateRequest } from '@middlewares/validate.middleware';
import CuratorService from '@/services/curator.service';
import UserRepository from '@/repositories/user.repository';
import { getCuratorDetailsSchema, getCuratorsSchema, postProfileImageSchema, putProfileSchema } from '@/domain/schemas/curator.schema';
import { upload } from '@utils/multer';

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

  uploadCuratorImage = async (req: RequestWithUser) => {
    console.log(req.file.filename);
    const data = await this.curatorService.updateCuratorDetails({ profileImage: req.file.filename }, req.user.id);
    return { data, message: 'Successfully updated profile image!' };
  };

  updateCuratorProfile = async (req: Request) => {
    const data = await this.curatorService.updateCuratorDetails(req.body, req.user.id);
    return { data, message: "Successfully updated curator's profile!" };
  };

  getCuratorProfile = async (req: Request) => {
    const data = await this.curatorService.getCuratorProfile(req.user.id);
    return { data };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}/`, [this.authMiddleware.validateApiKey], validateRequest(getCuratorsSchema), handleRequest(this.getCurators));
    this.router.get(`/profile`, [this.authMiddleware.verifyUser], handleRequest(this.getCuratorProfile));
    this.router.get(
      `${this.path}/:username`,
      [this.authMiddleware.validateApiKey],
      validateRequest(getCuratorDetailsSchema),
      handleRequest(this.getCuratorDetails),
    );
    this.router.post(
      `${this.path}/upload`,
      [this.authMiddleware.verifyUser, validateRequest(postProfileImageSchema), upload.single('file')],
      handleRequest(this.uploadCuratorImage),
    );
    this.router.put(
      `${this.path}/profile`,
      [this.authMiddleware.verifyUser, validateRequest(putProfileSchema)],
      handleRequest(this.updateCuratorProfile),
    );
  }
}

export default CuratorController;
