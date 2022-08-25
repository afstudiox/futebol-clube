import { ITeam } from '../Interfaces/ITeam';
import TeamModel from '../database/models/teams';

export interface ITeamService {
  findAll(): Promise<ITeam[]>
  findById(id:string): Promise<ITeam | null>
}

export class TeamService implements ITeamService {
  private teamModel;
  constructor() { this.teamModel = TeamModel; }

  async findAll(): Promise<ITeam[]> {
    const teams: ITeam[] = await this.teamModel.findAll({
      raw: true,
    });
    return teams;
  }

  async findById(id:string): Promise<ITeam | null> {
    const team: ITeam | null = await this.teamModel.findOne({
      where: { id },
      raw: true,
    });
    return team;
  }
}
