import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'home_team_id', as: 'id_home_team' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'home_team_id', as: 'id_home_team' });

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'away_team_id', as: 'id_away_team' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'away_team_id', as: 'id_away_team' });

export default MatchesModel;
