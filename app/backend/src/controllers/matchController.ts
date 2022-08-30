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

    const validateCheck = Jwtservice.decode(token);
    if (!validateCheck) throw new NewError('unauthorized', 'Token must be a valid token');

    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      throw new
      NewError('unauthorized', 'It is not possible to create a match with two equal teams');
    }
    const home = await this.matchService.findById(homeTeam);
    const away = await this.matchService.findById(awayTeam);
    if (!home || !away) {
      throw new NewError('notFoundError', 'There is no team with such id!');
    }

    const newMatch = await this.matchService.saveMatch(req.body);
    res.status(201).json(newMatch);
  }

  async finishMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const matchFinished = await this.matchService.finishMatch(id);
    res.status(200).json(matchFinished);
  }

  async changeGoals(req: Request, res: Response): Promise<void> {
    const newData = req.body;
    const { id } = req.params;
    await this.matchService.changeGoals(newData, id);
    res.status(200).json('Match Update');
  }
}
