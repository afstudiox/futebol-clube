import { Request, Response } from 'express';
import { ITeamService } from '../services/teamService';

export default class teamController {
  constructor(
    private teamService: ITeamService,
  ) { }

  async findAll(req: Request, res: Response): Promise<void> {
    const teams = await this.teamService.findAll();
    res.status(200).json(teams);
  }
}
