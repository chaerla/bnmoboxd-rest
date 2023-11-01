import Application from '@/application';
import AuthController from '@controllers/auth.controller';
import IndexController from '@controllers/index.controller';
import CuratorReviewController from '@controllers/curator-review.controller';
import FilmController from '@controllers/film.controller';

const app = new Application([new AuthController(), new IndexController(), new CuratorReviewController(), new FilmController()]);
app.listen();
