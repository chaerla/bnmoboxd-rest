import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { validateRequest } from '@middlewares/validate.middleware';
import PhpApi from '@/adapters/php-api';
import { getFilmsSchema } from '@/domain/schemas/film.schema';

class FilmController implements Controller {
  public path = '/film';
  public router = Router();
  private phpApi: PhpApi;
  constructor() {
    this.phpApi = new PhpApi();
    this.initializeRoutes();
  }

  getFilms = async (req: Request) => {
    const data = await this.phpApi.searchFilms({ ...req.query });
    return { data };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}`, [validateRequest(getFilmsSchema)], handleRequest(this.getFilms));
  }
}

export default FilmController;
