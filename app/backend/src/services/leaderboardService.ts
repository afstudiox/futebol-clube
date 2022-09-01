import Team from '../database/models/team';
import Match from '../database/models/match';
import { ILeaderboard, ITeamAndMatches } from '../Interfaces/ILeaderboard';
// import { ITeam } from '../Interfaces/ITeam';

export interface ILeaderboardService {
  findAllTeams(): Promise<ITeamAndMatches[]>
  boardHome(): Promise<unknown>
  xablau(): Promise<any>
}

export class LeaderboardService implements ILeaderboardService {
  private matchModel;
  private teamModel;
  constructor() { this.matchModel = Match; this.teamModel = Team; }

  async findAllTeams(): Promise <ITeamAndMatches[]> {
    const teams = this.teamModel.findAll({
      include: [{
        model: Match,
        as: 'matchHome',
        where: { inProgress: false },
      }, {
        model: Match,
        as: 'matchAway',
        where: { inProgress: false },
      },
      ],
    });
    return teams as unknown as ITeamAndMatches[];
  }

  totalVictories = (param: ITeamAndMatches) => param.matchHome.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  totalLosses = (param: ITeamAndMatches) => param.matchHome.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  totalDraws = (param: ITeamAndMatches) => param.matchHome.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  golsFavor = (param: ITeamAndMatches) => param.matchHome
    .reduce((acc, curr) => curr.homeTeamGoals + acc, 0);

  golsOwn = (param: ITeamAndMatches) => param.matchHome
    .reduce((acc, curr) => curr.awayTeamGoals + acc, 0);

  async xablau() {
    const xablau2: any = await this.boardHome();
    const xablau3: any = xablau2.sort((a:any, b:any) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return 0;
    });
    return xablau3;
  }

  async boardHome(): Promise<unknown | ILeaderboard[]> {
    const allData = await this.findAllTeams();
    const teste = allData
      .map((team) => ({
        name: team.teamName,
        totalPoints: (this.totalVictories(team) * 3) + this.totalDraws(team),
        totalGames: team.matchHome.length,
        totalVictories: this.totalVictories(team),
        totalDraws: this.totalDraws(team),
        totalLosses: this.totalLosses(team),
        goalsFavor: this.golsFavor(team),
        goalsOwn: this.golsOwn(team),
        goalsBalance: this.golsFavor(team) - this.golsOwn(team),
        efficiency: ((((this.totalVictories(team) * 3)
        + (this.totalDraws(team))) / ((team.matchHome.length * 3)))
        * 100).toFixed(2),
      }));
    return teste;
  }
}
