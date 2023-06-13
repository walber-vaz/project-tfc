import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  declare readonly id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
