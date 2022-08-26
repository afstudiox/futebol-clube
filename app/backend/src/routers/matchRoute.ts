import { Router } from 'express';
import MatchController from '../controllers/matchController';
import { MatchService } from '../services/matchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', (req, res) => matchController.findAll(req, res));

export default matchRouter;
