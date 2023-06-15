import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import httpStatus from '../utils/httpStatus';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined || inProgress === '') {
      const { data } = await this.matchService.findAll();
      return res.status(200).json(data);
    }
    const { data } = await this.matchService.findAll(inProgress === 'true');
    return res.status(200).json(data);
  }

  async finish(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.matchService.finish(Number(id));
    if (status !== 'SUCCESSFUL') return res.status(httpStatus(status)).json(data);
    return res.status(200).json(data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data, status } = await this.matchService
      .update(Number(id), homeTeamGoals, awayTeamGoals);
    if (status !== 'SUCCESSFUL') return res.status(httpStatus(status)).json(data);
    return res.status(200).json(data);
  }
}
