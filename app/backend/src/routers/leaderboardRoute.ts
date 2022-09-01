import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import { LeaderboardService } from '../services/leaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.findAll(req, res));
leaderboardRouter.get('/home2', (req, res) => leaderboardController.find(req, res));

export default leaderboardRouter;
