import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../interface/ServiceResponse';
import { IMatchModel } from '../interface/Match/IMatchModel';
import { IMatch, IMatchTeams } from '../interface/Match/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  async findAll(query?: boolean): Promise<ServiceResponse<IMatchTeams[]>> {
    const allMatches = await this.matchModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async finish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const updated = await this.matchModel.update(id, { inProgress: false });

    if (updated === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const updated = await this.matchModel.update(id, { homeTeamGoals, awayTeamGoals });

    if (updated === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  async create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const created = await this.matchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    if (!created) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'SUCCESSFUL', data: created };
  }
}
