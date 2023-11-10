import Controller from '@interfaces/controller';
import { Request, Router } from 'express';
import { handleRequest } from '@utils/handle-request';
import { validateRequest } from '@middlewares/validate.middleware';
import { getFilmsSchema } from '@/domain/schemas/film.schema';
import FilmService from '@/services/film.service';
import PhpApi from '@/adapters/php-api';

class FilmController implements Controller {
  public path = '/film';
  public router = Router();
  private filmService: FilmService;
  constructor() {
    this.initializeRoutes();
    const phpApi = new PhpApi();
    this.filmService = new FilmService(phpApi);
  }

  getFilms = async (req: Request) => {
    const data = await this.filmService.getFilms(req.query);
    return { data };
  };

  private initializeRoutes() {
    this.router.get(`${this.path}`, [validateRequest(getFilmsSchema)], handleRequest(this.getFilms));
  }
}

export default FilmController;
