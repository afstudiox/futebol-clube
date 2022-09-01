import { Request, Response } from 'express';
import { ILeaderboardService } from '../services/leaderboardService';

export default class leaderboardController {
  constructor(
    private leaderboardService: ILeaderboardService,
  ) { }

  async findAll(req: Request, res: Response): Promise<void> {
    const board = await this.leaderboardService.xablau();
    res.status(200).json(board);
  }

  async find(req: Request, res: Response): Promise<void> {
    const board = await this.leaderboardService.findAllTeams();
    res.status(200).json(board);
  }
}
