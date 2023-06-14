import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';
import TeamModel from '../models/TeamModel';

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

teamsRouter.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default teamsRouter;
