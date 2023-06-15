import { ITeam } from '../Teams/ITeam';

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchTeams extends IMatch {
  homeTeam?: Partial<ITeam>;
  awayTeam?: Partial<ITeam>;
}
