import { Sequelize } from 'sequelize';
import SequelizeTeam from '../../database/models/SequelizeTeam';
import SequelizeMatch from '../../database/models/SequelizeMatch';
import { ILeaderBoard, ILeaderBoardDB } from '../interface/LeaderBoard/ILeaderBoard';
import { IMatch } from '../interface/Match/IMatch';
import { ILeaderBoardModel } from '../interface/LeaderBoard/ILeaderBoardModel';
import queryLoaderBoard from '../utils/queryLoaderBoard';

export default class LeaderBoardModel implements ILeaderBoardModel {
  private model = SequelizeMatch;

  async findLeaderBoard(param?: 'home' | 'away'): Promise<ILeaderBoard[]> {
    if (!param) return this.findLeaderBoard();
    const matches = param === 'home' ? await this.findHomeTeams() : await this.findAwayTeams();
    return LeaderBoardModel
      .mapLeaderBoard(matches as unknown as ILeaderBoardDB[])
      .sort(LeaderBoardModel.orderLeaderBoard);
  }

  async findAllTeams(): Promise<ILeaderBoard[]> {
    return this.model.sequelize?.query(
      queryLoaderBoard,
      { type: 'SELECT' },
    ) as unknown as ILeaderBoard[];
  }

  private async findHomeTeams(): Promise<IMatch[]> {
    return this.model.findAll({
      attributes: [
        [Sequelize.literal('COUNT(matches.id)'), 'totalGames'],
        [Sequelize.literal(`SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalVictories'],
        [Sequelize.literal(`SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalLosses'],
        [Sequelize.literal(`SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalDraws'],
        [Sequelize.literal('SUM(matches.home_team_goals)'), 'goalsFavor'],
        [Sequelize.literal('SUM(matches.away_team_goals)'), 'goalsOwn'],
      ],
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] }],
      where: { inProgress: false },
      group: 'home_team_id',
    });
  }

  private async findAwayTeams(): Promise<IMatch[]> {
    return this.model.findAll({
      attributes: [
        [Sequelize.literal('COUNT(matches.id)'), 'totalGames'],
        [Sequelize.literal(`SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalVictories'],
        [Sequelize.literal(`SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalLosses'],
        [Sequelize.literal(`SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalDraws'],
        [Sequelize.literal('SUM(matches.away_team_goals)'), 'goalsFavor'],
        [Sequelize.literal('SUM(matches.home_team_goals)'), 'goalsOwn'],
      ],
      include: [{ model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] }],
      where: { inProgress: false },
      group: 'away_team_id',
    });
  }

  private static mapLeaderBoard(matches: ILeaderBoardDB[]): ILeaderBoard[] {
    return matches.map((match) => {
      const team = (match.homeTeam ?? match.awayTeam) ?? { teamName: '' };
      const { totalGames, totalLosses, goalsFavor, goalsOwn } = match.dataValues;
      const totalVictories = Number(match.dataValues.totalVictories);
      const totalDraws = Number(match.dataValues.totalDraws);

      return {
        name: team.teamName,
        totalGames: Number(totalGames),
        totalVictories,
        totalLosses: Number(totalLosses),
        totalDraws,
        goalsFavor: Number(goalsFavor),
        goalsOwn: Number(goalsOwn),
        goalsBalance: Number(goalsFavor) - Number(goalsOwn),
        totalPoints: totalVictories * 3 + totalDraws,
        efficiency: LeaderBoardModel.calculateEfficiency(totalGames, totalVictories, totalDraws),
      };
    });
  }

  private static calculateEfficiency(
    totalGames: number,
    totalVictories: number,
    totalDraws: number,
  ): string {
    return (((totalVictories + totalDraws / 3) / totalGames) * 100).toFixed(2);
  }

  private static orderLeaderBoard(a: ILeaderBoard, b: ILeaderBoard): number {
  // Compare total points
    if (a.totalPoints !== b.totalPoints) {
      return a.totalPoints > b.totalPoints ? -1 : 1;
    }

    // Compare total victories
    if (a.totalVictories !== b.totalVictories) {
      return a.totalVictories > b.totalVictories ? -1 : 1;
    }

    // Compare goals balance
    if (a.goalsBalance !== b.goalsBalance) {
      return a.goalsBalance > b.goalsBalance ? -1 : 1;
    }

    // Compare goals favor
    if (a.goalsFavor !== b.goalsFavor) {
      return a.goalsFavor > b.goalsFavor ? -1 : 1;
    }

    // If all else fails, return 0
    return 0;
  }
}
