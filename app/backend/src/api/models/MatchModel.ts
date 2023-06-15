import Team from '../../database/models/SequelizeTeam';
import Match from '../../database/models/SequelizeMatch';
import { IMatchTeams } from '../interface/Match/IMatch';
import { IMatchModel } from '../interface/Match/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = Match;

  async findAll(query?: boolean): Promise<IMatchTeams[]> {
    const match = query !== undefined ? { inProgress: query } : {};

    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: match,
    });

    return matches.map((m) => ({
      id: m.id,
      homeTeamId: m.homeTeamId,
      homeTeamGoals: m.homeTeamGoals,
      awayTeamGoals: m.awayTeamGoals,
      awayTeamId: m.awayTeamId,
      inProgress: m.inProgress,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
    }));
  }
}
