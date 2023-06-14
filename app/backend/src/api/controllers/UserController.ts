import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import httpStatus from '../utils/httpStatus';

export default class UserController {
  constructor(
    private userService = new LoginService(),
  ) { }

  async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);
    if (status !== 'SUCCESSFUL') {
      return res.status(httpStatus(status)).json(data);
    }
    return res.status(200).json(data);
  }

  async getUserRole(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.getUserRole(req.body.token.email);
    if (status !== 'SUCCESSFUL') {
      return res.status(httpStatus(status)).json(data);
    }
    return res.status(200).json({ role: data });
  }
}
