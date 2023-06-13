import TeamsModel from '../database/models/TeamsModel';

export default interface ITeamService {
  findAll(): Promise<TeamsModel[]>;
  findById(id: number): Promise<TeamsModel | null>;
}
