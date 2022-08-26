import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoal!: number;
  inProgress!: number;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(
  Match,
  {
    foreignKey: 'id',
    as: 'matches',
  },
);

Match.belongsTo(
  Team,
  {
    foreignKey: 'home_team',
    as: 'homeTeam',
  },
);

Match.belongsTo(
  Team,
  {
    foreignKey: 'away_team',
    as: 'awayTeam',
  },
);

export default Match;
