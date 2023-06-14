import { ITeam } from '../interface/Teams/ITeam';
import { ITeamModel } from '../interface/Teams/ITeamModel';
import { ServiceResponse } from '../interface/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel,
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: `Team with id ${id} not found`,
        },
      };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
