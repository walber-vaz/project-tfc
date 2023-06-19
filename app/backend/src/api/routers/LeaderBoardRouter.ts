import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/:param',
  (req: Request, res: Response) => leaderBoardController.find(req, res),
);

export default leaderBoardRouter;
