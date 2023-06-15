import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../interface/ServiceResponse';
import { IMatchModel } from '../interface/Match/IMatchModel';
import { IMatchTeams } from '../interface/Match/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(query?: boolean): Promise<ServiceResponse<IMatchTeams[]>> {
    const allMatches = await this.matchModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
