import { Request, Response } from 'express';
import NewError from '../middlewares/NewError';
import { IMatchService } from '../services/matchService';
import Jwtservice from '../services/jwtService';

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

  async saveMatch(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization;
    if (!token) throw new NewError('unauthorized', 'Token não encontrado');
    const validateToken = Jwtservice.verify(token);
    if (!validateToken) throw new NewError('unauthorized', 'Token inválido');
    const newData = req.body;
    const newMatch = await this.matchService.saveMatch(newData);
    res.status(201).json(newMatch);
  }
}
