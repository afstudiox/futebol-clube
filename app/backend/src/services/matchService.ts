import Team from '../database/models/team';
import MatchModel from '../database/models/match';
import { IMatch } from '../Interfaces/IMatch';

export interface IMatchService {
  findAll(): Promise<IMatch[]>
  findInProgress(status: boolean): Promise<IMatch[]>
}

export class MatchService implements IMatchService {
  private matchModel;
  constructor() { this.matchModel = MatchModel; }

  async findAll(): Promise<IMatch[]> {
    const matches: IMatch[] = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  async findInProgress(inProgress: boolean): Promise<IMatch[]> {
    const matchesInProgress: IMatch[] = await this.matchModel.findAll({
      where: { inProgress },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matchesInProgress;
  }
}
