import * as express from 'express';
import teamsRouter from './api/routes/TeamsRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  /**
   * A function to add middleware to handle access control headers.
   *
   * @return {void}
   * @private
   * @memberof App
   */
  private middlewares(): void {
    /**
     * A middleware function to handle access control headers.
     *
     * @param {express.Request} _req - the request object.
     * @param {express.Response} res - the response object.
     * @param {express.NextFunction} next - the next middleware function in the chain.
     */
    const accessControl: express.RequestHandler = (
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  /**
   * Defines the routes for the application.
   *
   * @return {void}
   * @private
   * @memberof App
   */
  private routes(): void {
    this.app.get('/', (_req: express.Request, res: express.Response) => res.json({ ok: true }));
    this.app.use('/teams', teamsRouter);
  }

  /**
   * Starts the server by listening on the specified port.
   *
   * @param {string | number} PORT - The port to listen on.
   * @return {void} This function does not return anything.
   * @memberof App
   */
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
export const { app } = new App();
