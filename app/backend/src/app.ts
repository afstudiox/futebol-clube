import * as express from 'express';
import 'express-async-errors';
import loginRoute from './routers/loginRoute';
import errorhandlerMiddleware from './middlewares/ErrorHandler';
import teamRoute from './routers/teamRoute';
import matchRoute from './routers/matchRoute';
import leaderboardRoute from './routers/leaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRoute);
    this.app.use('/teams', teamRoute);
    this.app.use('/matches', matchRoute);
    this.app.use('/leaderboard', leaderboardRoute);
    this.app.use(errorhandlerMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
