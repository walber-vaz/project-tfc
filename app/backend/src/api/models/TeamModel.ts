import SequelizeTeam from '../../database/models/SequelizeTeam';
import { ITeam } from '../interface/Teams/ITeam';
import { ITeamModel } from '../interface/Teams/ITeamModel';

export default class TeamModel implements Partial<ITeamModel> {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;
    const { teamName } = data;
    return { id, teamName };
  }
}
