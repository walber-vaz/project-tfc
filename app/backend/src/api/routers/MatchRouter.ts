import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import validations from '../middlewares/validations';

const matchController = new MatchController();
const { token: validationToken, register: validationRegister } = validations;
const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => matchController.findAll(req, res));
matchRouter.post(
  '/',
  validationToken,
  validationRegister,
  (req: Request, res: Response) => matchController.create(req, res),
);
matchRouter.patch(
  '/:id',
  validationToken,
  (req: Request, res: Response) => matchController.update(req, res),
);
matchRouter.patch(
  '/:id/finish',
  validationToken,
  (req: Request, res: Response) => matchController.finish(req, res),
);

export default matchRouter;
