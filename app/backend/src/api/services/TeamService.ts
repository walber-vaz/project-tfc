import { ITeam } from '../interface/Teams/ITeam';
import { ITeamModel } from '../interface/Teams/ITeamModel';
import { ServiceResponse } from '../interface/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (team) {
      return { status: 'SUCCESSFUL', data: team };
    }
    return {
      status: 'NOT_FOUND',
      data: {
        message: `Team with id ${id} not found`,
      },
    };
  }
}
