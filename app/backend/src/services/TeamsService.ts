import { ModelStatic } from 'sequelize';
import ITeamService from '../Interfaces/ITeamService';
import TeamsModel from '../database/models/TeamsModel';

class TeamsService implements ITeamService {
  protected model: ModelStatic<TeamsModel> = TeamsModel;

  async findAll(): Promise<TeamsModel[]> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<TeamsModel | null> {
    return this.model.findByPk(id);
  }
}

export default TeamsService;
