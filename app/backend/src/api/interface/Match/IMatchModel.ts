import { IMatch, IMatchTeams } from './IMatch';

export interface IMatchModel {
  findAll(query?: boolean): Promise<IMatchTeams[]>;
  update(id: number, updated: Partial<IMatchTeams>): Promise<number | null>;
  create(created: Omit<IMatch, 'id'>): Promise<IMatch | null>;
}
