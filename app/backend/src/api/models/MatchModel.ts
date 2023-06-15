import Team from '../../database/models/SequelizeTeam';
import Match from '../../database/models/SequelizeMatch';
import { IMatchTeams } from '../interface/Match/IMatch';
import { IMatchModel } from '../interface/Match/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = Match;

  async findAll(query?: boolean): Promise<IMatchTeams[]> {
    let match = {};
    if (query !== undefined) {
      match = { inProgress: query };
    }
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: match,
    });
    return matches.map(({
      id, homeTeamId, homeTeamGoals, awayTeamGoals, awayTeamId, inProgress, homeTeam, awayTeam,
    }) => ({
      id, homeTeamId, homeTeamGoals, awayTeamGoals, awayTeamId, inProgress, homeTeam, awayTeam,
    }));
  }
}
