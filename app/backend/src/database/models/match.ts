import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  id!: number;
  homeTeam!: number; // fk
  homeTeamGoals!: number;
  awayTeam!: number; // fk
  awayTeamGoals!: number;
  inProgress!: boolean;
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
    type: BOOLEAN,
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
    foreignKey: 'homeTeam',
    as: 'matchHome',
  },
);

Team.hasMany(
  Match,
  {
    foreignKey: 'awayTeam',
    as: 'matchAway',
  },
);

Match.belongsTo(
  Team,
  {
    foreignKey: 'homeTeam',
    as: 'teamHome',
  },
);

Match.belongsTo(
  Team,
  {
    foreignKey: 'awayTeam',
    as: 'teamAway',
  },
);

export default Match;
