import express from 'express';
import Controller from '@interfaces/controller';
import compression from 'compression';
import helmet from 'helmet';
import { errorMiddleware } from '@middlewares/error.middleware';
import { ENV, PORT } from '@config';

class Application {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.env = ENV;
    this.port = PORT;
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.initializeRoutes(controllers);
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private initializeRoutes(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }
}

export default Application;
