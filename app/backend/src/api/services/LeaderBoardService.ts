import { ServiceResponse } from '../interface/ServiceResponse';
import { ILeaderBoard } from '../interface/LeaderBoard/ILeaderBoard';
import LeaderBoardModel from '../models/LeaderBoardModel';
import { ILeaderBoardModel } from '../interface/LeaderBoard/ILeaderBoardModel';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel: ILeaderBoardModel = new LeaderBoardModel(),
  ) { }

  async findLeaderBoard(
    param?: 'away' | 'home',
  ): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoard = await this.leaderBoardModel.findLeaderBoard(param);
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
}
