import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import CpfController from './controllers/CpfController';
import handleError from './middlewares/handleError';
import * as swaggerDocument from '../swagger-output.json';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.initAuthHeader();
    this.initRoutes();
    this.initAuthHeader();
    this.initMiddlewares();
  }

  private initAuthHeader(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.get('/coffee', (_req, res) => res.status(418).end());
    this.app.use(new CpfController().initRoutes());
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private initMiddlewares(): void {
    this.app.use(handleError);
  }
}

export default new App().app;
