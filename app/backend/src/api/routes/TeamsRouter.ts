import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const teamsRouter = Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.findById(req, res));
teamsRouter.get('/', (req: Request, res: Response) => teamsController.findAll(req, res));

export default teamsRouter;
