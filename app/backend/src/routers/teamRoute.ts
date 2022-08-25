import { Router } from 'express';
import TeamController from '../controllers/teamController';
import { TeamService } from '../services/teamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.findAll(req, res));

export default teamRouter;
