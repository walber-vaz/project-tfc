import { DataTypes, Model, QueryInterface } from 'sequelize';
import { IMatch } from '../../api/interface/Match/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};