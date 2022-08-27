import { Request, Response } from 'express';
import { IMatchService } from '../services/matchService';

export default class matchController {
  constructor(
    private matchService: IMatchService,
  ) { }

  async findAll(req: Request, res: Response): Promise<void> {
    const matches = await this.matchService.findAll();
    res.status(200).json(matches);
  }

  async findInProgress(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matchesInProgress = await this.matchService
      .findInProgress(inProgress === 'true');
    res.status(200).json(matchesInProgress);
  }
}
