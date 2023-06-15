import { IMatchTeams } from './IMatch';

export interface IMatchModel {
  findAll(query?: boolean): Promise<IMatchTeams[]>;
  update(id: number, updated: Partial<IMatchTeams>): Promise<number | null>;
}
