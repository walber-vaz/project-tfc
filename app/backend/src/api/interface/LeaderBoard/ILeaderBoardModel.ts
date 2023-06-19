import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderBoardModel {
  findLeaderBoard(flag: 'home' | 'away'): Promise<ILeaderBoard[]>;
}
