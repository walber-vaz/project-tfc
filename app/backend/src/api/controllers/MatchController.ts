import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined || inProgress === '') {
      const { data } = await this.matchService.getAllMatches();
      return res.status(200).json(data);
    }
    const { data } = await this.matchService.getAllMatches(inProgress === 'true');
    return res.status(200).json(data);
  }
}
