import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class Sequelizematch extends Model
  <InferAttributes<Sequelizematch>,
  InferCreationAttributes<Sequelizematch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Sequelizematch.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Sequelizematch.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Sequelizematch.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Sequelizematch;
