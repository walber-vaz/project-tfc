import { Op } from 'sequelize';
import Team from '../../database/models/SequelizeTeam';
import Match from '../../database/models/SequelizeMatch';
import { IMatch, IMatchTeams } from '../interface/Match/IMatch';
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

  async update(id: number, updated: Partial<IMatch>): Promise<number | null> {
    const match = await this.model.findByPk(id);
    if (!match) return null;
    const updatedMatch = await this.model.update(updated, { where: { id } });
    return updatedMatch[0];
  }

  async create(created: Omit<IMatch, 'id'>): Promise<IMatch | null> {
    const { count } = await Team.findAndCountAll({
      where: { id: { [Op.in]: [created.homeTeamId, created.awayTeamId] } },
    });
    if (count !== 2) return null;
    const match = await this.model.create({
      homeTeamId: created.homeTeamId,
      awayTeamId: created.awayTeamId,
      homeTeamGoals: created.homeTeamGoals,
      awayTeamGoals: created.awayTeamGoals,
      inProgress: created.inProgress,
    });
    return match;
  }
}
