import { IMatchTeams } from './IMatch';

export interface IMatchModel {
  findAll(query?: boolean): Promise<IMatchTeams[]>;
}
