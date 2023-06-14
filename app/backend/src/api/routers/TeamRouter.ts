import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

teamsRouter.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default teamsRouter;
