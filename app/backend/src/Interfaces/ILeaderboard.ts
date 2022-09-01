import { ITeam } from './ITeam';

export interface ILeaderboard {
  name: string,
  totalPoints: number, // calculate
  totalGames: number, // ok
  totalVictories: number, // number
  totalDraws: number, // calculate
  totalLosses: number, // 2
  goalsFavor: number, // 3
  goalsOwn: number, // 4
  goalsBalance: number, // calculate
  efficiency: number // calculate
}

export interface IBase {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ITeamAndMatches extends ITeam{
  matchHome: IBase[],
  matchAway: IBase[],
}
