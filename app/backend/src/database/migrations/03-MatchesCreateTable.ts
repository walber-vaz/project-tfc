import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('matches', {
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
    })
  },
}