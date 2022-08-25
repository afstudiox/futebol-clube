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

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const team = await this.teamService.findById(id);
    res.status(200).json(team);
  }
}
