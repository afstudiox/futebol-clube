import Team from '../database/models/team';
import MatchModel from '../database/models/match';
// import { IBodyMatch, IMatch } from '../Interfaces/IMatch';
import { IBodyMatch, IMatch, IMessage } from '../Interfaces/IMatch';

export interface IMatchService {
  findAll(): Promise<IMatch[]>
  findInProgress(status: boolean): Promise<IMatch[]>
  saveMatch(newData: IBodyMatch): Promise<IMatch>
  finishMatch(id:string): Promise<IMessage>
  findById(id:string): Promise<IMatch | null>
}

export class MatchService implements IMatchService {
  private matchModel;
  constructor() { this.matchModel = MatchModel; }

  async findById(id:string): Promise<IMatch | null> {
    const validateMatch = await this.matchModel.findByPk(id);
    return validateMatch;
  }

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

  async saveMatch(newData: IBodyMatch): Promise<IMatch> {
    const newMatch: IMatch = await this.matchModel.create(
      { ...newData,
        inProgress: true,
      },
    );
    return newMatch;
  }

  async finishMatch(id:string): Promise<IMessage> {
    await this.matchModel.update(
    // const retorno = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    // o valor de retorno é um array da quantidade de linhas afetadas pelo update ( [0] = nenhuma || [1] = uma
    // console.log(retorno);
    return { message: 'Finished' };
  }
}
