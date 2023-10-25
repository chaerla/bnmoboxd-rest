import Application from '@/application';
import AuthController from '@controllers/auth.controller';
import IndexController from '@controllers/index.controller';
import CuratorReviewController from '@controllers/curator-review.controller';

const app = new Application([new AuthController(), new IndexController(), new CuratorReviewController()]);
app.listen();
