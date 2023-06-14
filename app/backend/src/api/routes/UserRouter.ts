import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validationLogin';
import validationToken from '../middlewares/validationToken';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', validateLogin, userController.login);

userRouter.get('/role', validationToken, (req: Request, res: Response) => {
  res.status(200).json({ role: res.locals.user.role });
});

export default userRouter;
