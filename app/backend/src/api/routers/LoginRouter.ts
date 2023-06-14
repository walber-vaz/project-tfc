import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import validations from '../middlewares/validations';

const userController = new UserController();
const loginRouter = Router();
const { login: validationLogin, token: validationToken } = validations;

loginRouter.post(
  '/',
  validationLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

loginRouter.get(
  '/role',
  validationToken,
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default loginRouter;
