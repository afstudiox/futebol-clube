import { Router } from 'express';
import MatchController from '../controllers/matchController';
import { MatchService } from '../services/matchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', (req, res) => matchController.findAll(req, res));
matchRouter.get('/search', (req, res) => matchController.findInProgress(req, res));
matchRouter.post('/', (req, res) => matchController.saveMatch(req, res));
matchRouter.patch('/:id/finish', (req, res) => matchController.finishMatch(req, res));
matchRouter.patch('/:id', (req, res) => matchController.changeGoals(req, res));

export default matchRouter;
