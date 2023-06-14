import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import httpStatus from '../utils/httpStatus';

export default class BookController {
  constructor(
    private teamService: TeamService,
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const { data } = await this.teamService.getAllTeams();
    res.status(200).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(Number(id));
    if (status !== 'SUCCESSFUL') {
      res.status(httpStatus(status)).json(data);
    } else {
      res.status(200).json(data);
    }
  }
}
