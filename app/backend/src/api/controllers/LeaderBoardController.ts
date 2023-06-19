import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import httpStatus from '../utils/httpStatus';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  async find(req: Request, res: Response) {
    const param = req.params.param as 'home' | 'away';

    const { data, status } = await this.leaderBoardService.findLeaderBoard(param);

    if (status !== 'SUCCESSFUL') {
      return res.status(httpStatus(status)).json(data);
    }

    res.status(200).json(data);
  }
}
