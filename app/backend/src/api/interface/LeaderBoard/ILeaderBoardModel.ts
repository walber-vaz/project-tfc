import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderBoardModel {
  findLeaderBoard(param?: 'home' | 'away'): Promise<ILeaderBoard[]>;
}
